$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem("identity"));
    getAvatarUser();
    // $(".avatarLoaded img").attr("src", "../images/sentidos/pirata.png");
    $(".btnReflexion").click(function(){
        let sense=$(this).attr("value").split("-")[1];
        let category=$(this).attr("value").split("-")[0];

        let user=identity._id;
        let answer=sense;
        let activity="reflexion";
        fetch('/inspiracioncomfama/validate/'+user+"&"+answer+"&"+activity, {
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
                if(response.message=="not found"){
                    $(".alert").css("display", "block");
                    $(".alert").attr("class", "alert alert-danger mt-2");
                    $(".alert").text("Debes compeltar todo el recorrido para reclamar el premio");
                    $(".redirectRecompensa").attr("href", "/inspiracioncomfama/sentido");
                }
            }else{
                getTrophy(sense, category);
            }
            console.log(response);
        })
        .catch(function(err){
            console.log(err);
        });

        // validateReflection(identity, sense,category);
    });
});

function getAvatarUser(){
    let image=localStorage.getItem('userAvatar');
    
    switch(image){
        case "pirataMin_1.png":
            $(".avatarSelected img").attr("src", "public/images/avatar/"+image);
            $(".avatarSelected img").css({
                "width": "80px",
                "margin":"0px 0px 0px 10px"
            });
            $(".avatarLoaded").attr("src", "public/images/sentidos/pirata.png");
        break;

        case "pirataMin_2.png":
            $(".avatarSelected img").attr("src", "public/images/avatar/"+image);
            $(".avatarSelected img").css({
                "width": "80px",
                "margin":"0px 0px 0px 10px"
            });
            $(".avatarLoaded").attr("src", "public/images/sentidos/pirata_2.png");
        break;

        case "pirataMin_3.png":
            $(".avatarSelected img").attr("src", "public/images/avatar/"+image);
            $(".avatarSelected img").css({
                "width": "70px",
                "margin":"0px 0px 0px 10px"
            });
            $(".avatarLoaded").attr("src", "public/images/sentidos/pirata_3.png");
        break;

        case "pirataMin_4.png":
            $(".avatarSelected img").attr("src", "public/images/avatar/"+image);
            $(".avatarSelected img").css({
                "width":"55px", 
                "margin":"6px 0px 0px 15px"
            });
            $(".avatarLoaded").attr("src", "public/images/sentidos/pirata_4.png");
        break;
    }
}

function validateReflection(identity, type){
    let user=identity._id;
    let answer=type;
    let activity="reflexion";
    fetch('/inspiracioncomfama/validate/'+user+"&"+answer+"&"+activity, {
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
            if(response.message=="not found"){
                $(".alert").css("display", "block");
                $(".alert").attr("class", "alert alert-danger mt-2");
                $(".alert").text("Debes compeltar todo el recorrido para reclamar el premio");
                $(".redirectRecompensa").attr("href", "/inspiracioncomfama/sentido");
            }
        }else{
            
        }
        console.log(response);
    })
    .catch(function(err){
        console.log(err);
    });
}

function getTrophy(sense, category){
    let identity=JSON.parse(localStorage.getItem("identity"));
    let trophy=$(".trophyImg").attr("value");
    let puntaje=0;
    if(category=="sentidos"){
        puntaje=20;
    }
    let data={
        user:identity._id,
        sense,
        trophy,
        points:puntaje
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

        window.location="/inspiracioncomfama/sentido";
        
    })
    .catch(function(err){
        console.log(err);
    });
}