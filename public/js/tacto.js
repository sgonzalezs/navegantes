$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    getValidate(identity, "tacto");
});

function answerTactoRelfexion(identity){
    $("#questionTacto").text();
    $("#questionTacto").text("Con la Covid-19 se está replanteando a nivel mundial el contacto físico con los demás ¿cómo sientes que esto ha afectado tu relación con tus amigos más cercanos?.");
    
    $("#formTacto").on("submit", function(e){
        e.preventDefault();
        let data={
            id:identity._id,
            answer:$("#txtAnswerTacto").val(),
            question:$("#questionTacto").text(),
            sense:'tacto',
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
                    $(".alert").text('Ya has completado esta sección');
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
                answerTactoRelfexion(identity);
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
                tacto:true,
                olfato:false,
                gusto:false

            })
        );
    }else{
        let senses=JSON.parse(localStorage.getItem('senses'));
        senses.tacto=true;
        localStorage.setItem('senses', JSON.stringify(senses));
    }
}
