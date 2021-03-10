$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    let student=JSON.parse(localStorage.getItem('student'));
    let age=student.grade;
    getValidate(identity, "vista", age);
});

function answerVista(identity, age){
    $("#questionVista").text();
    if(age<6){
        $("#questionVista").text("¿Has sentido pena o temor por cómo te ves?");
    }else{
        $("#questionVista").text("¿En qué momento me he sentido excluido o juzgado por cómo me veo, hablo o cómo me comporto?");
    }
    
    $("#formVista").on("submit", function(e){
        e.preventDefault();
        let data={
            id:identity._id,
            answer:$("#txtAnswerVista").val(),
            question:$("#questionVista").text(),
            sense:'vista',
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

function getValidate(identity, sense, age){
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
                answerVista(identity, age);
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
                vista:true,
                tacto:false,
                olfato:false,
                gusto:false

            })
        );
    }else{
        let senses=JSON.parse(localStorage.getItem('senses'));
        senses.vista=true;
        localStorage.setItem('senses', JSON.stringify(senses));
    }
}
