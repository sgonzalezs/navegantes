$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    getValidate(identity, "tacto");
});

function answerTacto(identity){
    var pictures=[ 
        'Abuelito',
        'Cantante', 
        'Deportista', 
        'Empresario', 
        'Enfermero', 
        'Juez', 
        'Ladron', 
        'Panadero', 
        'Policia', 
        'Profesor'
    ];
    var count=0;
        $(".btnSendTacto").click(function(){
        // console.log(pictures[count]);
        let answer=$(this).attr("value");
        let data={
            id:identity._id,
            answer,
            question:pictures[count],
            sense:'tacto',
            activity:'seleccion'
        }
        count++;
        fetch('/inspiracioncomfama/respuesta', {
            method: 'POST', 
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(function(res){
            return res.json();
        })
        .then(function(response){
            $(".pictureTitle").text();
            $(".pictureTitle").text(pictures[count]);
            $(".contentTacto img").attr("src", "public/images/sentidos/tacto/tipos/"+pictures[count]+".jpg");
            if(!response.ok){
                if(response.message=="exists"){
                    // $(".groupButtons button").attr("disabled", true);
                    // $(".btnContinue").css("display", "block");
                    // $(".alert").css("display", "block");
                    // $(".alert").text("Ya has completado esta sección");
                }
            }else{
                if(count==10){
                    $(".contentTacto img").attr("src", "public/images/sentidos/tacto/tipos/Profesor.jpg");
                    $(".groupButtons button").attr("disabled", true);
                    $(".btnContinue").css("display", "block");
                }
                
            }
        })
        .catch(function(err){
            console.log('Error:', err)
        });
    });
}

function getValidate(identity, sense){
    let user=identity._id;

    fetch("/inspiracioncomfama/seleccion/"+user+"&"+sense+"&seleccion",{
        type:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(function(res){
        return res.json();
    })
    .then(function(response){
        if(!response.ok){
            if(response.message=="not found"){
                answerTacto(identity);
            }
        }

        if(response.data.length<10){
            answerTacto(identity);
        }

        if(response.data.length==10){
            $(".groupButtons button").attr("disabled", true);
            $(".btnContinue").css("display", "block");
            $(".alert").css("display", "block");
            $(".alert").text("Ya has completado esta sección");
        }
    })
    .catch(function(err){
        console.log(err);
    });
}