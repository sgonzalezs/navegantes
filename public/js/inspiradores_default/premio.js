$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem("identity"));
    $(".btnInspiradores").click(function(){
        getInspirings(identity);
    });
});

function getInspirings(identity){
    let user=identity._id;

    fetch("/validate-votes/"+user, {
        type:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(function(res){
        return res.json();
    })
    .then(function(response){
        if(response.ok){
            var data=[];
            response.data.forEach(function(e,i){
                var category=e.category;
                if(category=="Cuerpo" || category=="Arte" || category=="Sociedad" || category=="Ciencia"){
                    data.push(category);  
                }
            });
            
            var points=75*data.length;
            getTrophy(identity, points);
            
        }
    })
    .catch(function(err){
        console.log(err);
    });
}

function getTrophy(identity, points){
    let trophy=$(".trophyImg").attr("value");
    let data={
        user:identity._id,
        sense:"inspiradores",
        trophy,
        points
    };

    fetch('/premio', {
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
                updatedPoints(data.user, data.sense, data.points);
            }
        }else{
            window.location="/inspiracioncomfama/viaje";
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

    fetch("/puntaje", {
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
            window.location="/inspiracioncomfama/viaje";
        }
    })
    .catch(function(err){
        console.log(err);
    });
}
