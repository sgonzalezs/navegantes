$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));

    getValidate(identity, "escucha");
    // answerMusica(identity);
});

function answerMusica(identity){
    $(".btnAudio").click(function(){
        let track=$(this).attr("value");
        let data={
            id:identity._id,
            answer:track,
            question:"Escucha los fragmentos de canciones y selecciona tu favorita.",
            sense:'escucha',
            activity:'seleccion'
        }
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
            if(!response.ok){
                if(response.message=="exists"){
                    $(".btnAudio").attr("disabled", true);
                    $(".btnContinue").css("display", "block");
                    $(".alert").css("display", "block");
                    $(".alert").text("Ya has completado esta sección");
                }
            }else{
                $(".btnAudio").attr("disabled", true);
                $(".btnContinue").css("display", "block");
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
                answerMusica(identity);
            }
        }
        else{
            if(response.data.length>0){
                $(".btnAudio").attr("disabled", true);
                $(".btnContinue").css("display", "block");
                $(".alert").css("display", "block");
                $(".alert").text("Ya has completado esta sección");
            }else{
                answerMusica(identity);
            }
        }
    })
    .catch(function(err){
        console.log(err);
    });
}