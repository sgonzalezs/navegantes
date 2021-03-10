$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    getValidate(identity, "gusto");
});

function answerGustoRelfexion(identity){
    $("#questionGusto").text();
    $("#questionGusto").text("¿A qué sabe la relación que tienes con tu familia?");
    
    $("#formGusto").on("submit", function(e){
        e.preventDefault();
        let data={
            id:identity._id,
            answer:$("#txtAnswerGusto").val(),
            question:$("#questionGusto").text(),
            sense:'gusto',
            activity:'reflexion'
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
                    $(".alert").css("display", "block");
                    $(".alert").text("Ya has completado esta sección");
                    $(".btnContinue").css("display", "block");
                    $(".btnSend").attr("disabled", true);
                    validateData(identity);
                }
            }else{
                $(".alert").css("display", "block");
                $(".alert").text(response.message);
                $(".btnContinue").css("display", "block");
                validateData(identity);
            }
        })
        .catch(function(err){
            console.log('Error:', err)
        });
    });
}

function getValidate(identity, sense){
    let user=identity._id;

    fetch("/inspiracioncomfama/seleccion/"+user+"&"+sense+"&reflexion",{
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
                answerGustoRelfexion(identity);
            }
        }
        else{
            $(".btnContinue").css("display", "block");
            $(".btnSend").attr("disabled", true);
            $(".alert").css("display", "block");
            $(".alert").text("Ya has completado esta sección");
        }
    })
    .catch(function(err){
        console.log(err);
    });
}

function validateData(identity){
    if(!localStorage.getItem('senses')){
        localStorage.setItem('senses', JSON.stringify(
            {
                user:identity._id,
                escucha:false,
                vista:false,
                tacto:false,
                olfato:false,
                gusto:true

            })
        );
    }else{
        let senses=JSON.parse(localStorage.getItem('senses'));
        senses.gusto=true;
        localStorage.setItem('senses', JSON.stringify(senses));
    }
}

