$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    let student=JSON.parse(localStorage.getItem('student'));
    let age=student.age;
    
    getValidate(identity, "inspiradores", age)
});

function answerInspiradores(identity, age){
    $("#question").text();
    if(age<6){
        $("#question").text("¿Quisieras ser como alguno de ellos?");
    }else{
        $("#question").text("¿Te identificas con alguno de ellos?");
    }

    $("#formReflexion").on("submit", function(e){
        e.preventDefault();
        let data={
            id:identity._id,
            answer:$("#txtAnswer").val(),
            question:$("#question").text(),
            sense:'inspiradores',
            activity:'reflexion'
        }

        fetch('/respuesta', {
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
                }
            }else{
                $(".alert").css("display", "block");
                $(".alert").text(response.message);
                $(".btnSend").attr("disabled", true);
                $(".btnContinue").css("display", "block");
            }
        })
        .catch(function(err){
            console.log('Error:', err)
        });
    });
}

function getValidate(identity, sense, age){
    let user=identity._id;

    fetch("/seleccion/"+user+"&"+sense+"&reflexion",{
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
                answerInspiradores(identity, age);
            }
        }
        else{
            $(".alert").css("display", "block");
            $(".alert").text("Ya has completado esta sección");
            $(".btnContinue").css("display", "block");
            $(".btnSend").attr("disabled", true);
        }
    })
    .catch(function(err){
        console.log(err);
    });
}