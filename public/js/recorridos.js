$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    let type=$(".paragraph").attr("id").split("-")[1];
    getValidate(identity, type);
});

function answerReflexionRecorridos(identity, type){
    $("#form").on("submit", function(e){
        e.preventDefault();
        let data={
            id:identity._id,
            answer:$("#txtAnswer").val(),
            question:$(".paragraph").text(),
            sense:type,
            activity:'recorridos'
        };

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
                }
            }else{
                $(".alert").css("display", "block");
                $(".alert").text(response.message);
                $(".btnContinue").css("display", "block");
                getRecorridos(identity);
            }
        })
        .catch(function(err){
            console.log('Error:', err)
        });
    });
}

function getValidate(identity, sense){
    let user=identity._id;
    fetch("/inspiracioncomfama/seleccion/"+user+"&"+sense+"&recorridos",{
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
                answerReflexionRecorridos(identity, sense);
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

function getRecorridos(identity){
    let user=identity._id;
    fetch("/inspiracioncomfama/recorridos-validacion/"+user+"&recorridos", {
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(function(res){
        return res.json();
    })
    .then(function(response){
        if(response.ok){
            var categories=[];
            if(response.data.length>0){
                response.data.forEach(function(e,i){
                    if(e.sense=="centro" || e.sense=="conocimiento" || e.sense=="apropiacion"){
                        categories.push(e.sense);
                    }
                });
                var points=categories.length*100;
                getTrophyRecorridos(identity,points);
            }
        }
    })
    .catch(function(err){
        console.log(err);
    });
    
}

function getTrophyRecorridos(identity, points){
    // let trophy=$(".trophyImg").attr("value");
    let data={
        user:identity._id,
        sense:"recorridos",
        trophy:"espada.png",
        points
    };
    
    fetch('/inspiracioncomfama/premio', {
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
        if(response.message=="exists"){
            updatedPoints(data.user, data.sense, data.points);
        }else{
            // window.location="/premiacion";
        }
    })
    .catch(function(err){
        console.log(err);
    });
}

function updatedPoints(user, sense, points){
    let data={
        user,
        sense,
        points
    };

    fetch("/inspiracioncomfama/puntaje", {
        method:"PUT",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(function(res){
        return res.json();
    })
    .then(function(response){
        if(response.ok){
            // window.location="/premiacion";
        }
    })
    .catch(function(err){
        console.log(err);
    });
}
