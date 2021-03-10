$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    validateVote(identity);
});

function validateVote(identity){
    let user=identity._id;
    let inspiring="Boyka";

    fetch("/validate-like/"+user+"&"+inspiring, {
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
                
            }
        }
        if(response.message=="complete"){
            $(".btnContinue").css("display", "block");
            $(".groupButtons").css("pointer-events", "none");
            $(".alert").css("display", "block");
            $(".alert").text("ya has votado por este inspirador");
            getVotes();
        }
    })
    .catch(function(err){
        console.log(err);
    });
}

function getVotes(){
    fetch('/votos/Boyka', {
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