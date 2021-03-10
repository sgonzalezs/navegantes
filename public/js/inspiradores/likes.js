$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));

    $(".btnQual").click(function(){
        let value=$(this).attr("value").split("-")[1];
        let name=$(this).attr("value").split("-")[0];
        let category=$(this).attr("value").split("-")[2];
        let data={
            name,
            option:value,
            user:identity._id,
            category
        };

        fetch('/inspiracioncomfama/vote', {
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
                    $(".btnContinue").css("display", "block");
                    $(".groupButtons").css("pointer-events", "none");
                    $(".alert").css("display", "block");
                    $(".alert").text("Ya calificaste este video");
                }
            }else{
                $(".btnContinue").css("display", "block");
                $(".groupButtons").css("pointer-events", "none");
                getVote(name);
                getInspirings(identity);
            }
        })
        .catch(function(err){
            console.log('Error:', err)
        });
    });
});

function getVote(name){
    fetch('/inspiracioncomfama/votos/'+name, {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json'
        }
      })
    .then(function(res){
        return res.json();
    })
    .then(function(response){
        if(!response.ok){
            console.log(400);
        }else{
            var likes=0;
            var dislikes=0;
            for(var i=0; i<response.data.length; i++){
                if(response.data[i].like){
                    likes++;
                }else{
                    dislikes++;
                }
            }
            $(".votes").text();
            $(".like").text(likes);
            $(".dislike").text(dislikes);
        }
    })
    .catch(function(err){
        console.log('Error:', err)
    });
}


// Subir puntaje 
function getInspirings(identity){
    let user=identity._id;

    fetch("/inspiracioncomfama/validate-votes/"+user, {
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
    // let trophy=$(".trophyImg").attr("value");
    let data={
        user:identity._id,
        sense:"inspiradores",
        trophy:'arte-pulpo.png',
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
        if(!response.ok){
            if(response.message=="exists"){
                updatedPoints(data.user, data.sense, data.points);
            }
        }else{
            // window.location="/viaje";
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
            // window.location="/viaje";
        }
    })
    .catch(function(err){
        console.log(err);
    });
}

