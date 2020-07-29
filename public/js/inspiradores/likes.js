$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));

    $(".btnQual").click(function(){
        let value=$(this).attr("value").split("-")[1];
        let name=$(this).attr("value").split("-")[0];
        let data={
            name,
            option:value
        };

        fetch('/votacion', {
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
                console.log(response.message);
            }else{
                $(".btnContinue").css("display", "block");
                $(".groupButtons").css("pointer-events", "none");
                getVotes(name);
                // $(".alert").css("display", "block");
                // $(".alert").text("ya has votado");
            }
        })
        .catch(function(err){
            console.log('Error:', err)
        });
    });

});

function getVotes(user){
    fetch('/votos/'+user, {
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
            console.log(response.message);
        }else{
            $(".votes").text();
            $(".like").text(response.data.like);
            $(".dislike").text(response.data.dislike);
        }
    })
    .catch(function(err){
        console.log('Error:', err)
    });
}