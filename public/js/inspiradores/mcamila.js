$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    let student=JSON.parse(localStorage.getItem('student'));
    let age=student.grade;
    var video=document.getElementById('video');
    validateVote(identity);
    if(age<6){
        video.src="https://www.youtube.com/embed/vLktbE_M-9g";
    }else{
        video.src="https://www.youtube.com/embed/CvHIP0zo5Sg";
    }
});

function validateVote(identity){
    let user=identity._id;
    let inspiring="Maria Camila Trillos";

    fetch("/inspiracioncomfama/validate-like/"+user+"&"+inspiring, {
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
                console.log(404);
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
    fetch('/inspiracioncomfama/votos/Maria Camila Trillos', {
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