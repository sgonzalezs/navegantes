$(document).ready(function(){
    getAvatarUser();
    let identity=JSON.parse(localStorage.getItem('identity'));
    answerOlfato(identity);
    $("#questionOlfato").text();
    $("#questionOlfato").text("¿Tienes a alguien para recordar? ¿con qué olor lo identificas?");

    $("#formOlfato").on("submit", function(e){
        e.preventDefault();
        let data={
            id:identity._id,
            answer:$("#txtAnswerOlfato").val(),
            sense:'olfato',
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
                  console.log(response.message);
              }else{
                //   $(".alert").css("display", "block");
                //   $(".alert").text(response.message);
                  $(".btnContinue").css("display", "block");
              }
          })
          .catch(function(err){
              console.log('Error:', err)
          });
    });

});

function getAvatarUser(){
    let image=localStorage.getItem('userAvatar');

    switch(image.split("/")[3]){
        case "pirataMin_1.png":
            $(".avatarSelected img").attr("src", image);
            $(".avatarSelected img").css({
                "width": "80px",
                "margin":"0px 0px 0px 10px"
            });
        break;

        case "pirataMin_2.png":
            $(".avatarSelected img").attr("src", image);
            $(".avatarSelected img").css({
                "width": "80px",
                "margin":"0px 0px 0px 10px"
            });
        break;

        case "pirataMin_3.png":
            $(".avatarSelected img").attr("src", image);
            $(".avatarSelected img").css({
                "width": "70px",
                "margin":"0px 0px 0px 10px"
            });
        break;

        case "pirataMin_4.png":
            $(".avatarSelected img").attr("src", image);
            $(".avatarSelected img").css({
                "width":"55px", 
                "margin":"6px 0px 0px 15px"
            });
        break;
    }
}

function answerOlfato(identity){
    $(".olfatoContent").click(function(){
        let smell=$(this).attr("value");

        let data={
            id:identity._id,
            answer:smell,
            sense:'olfato',
            activity:'seleccion'
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
                console.log(response.message);
            }else{
                $(".olfatoContent").css("pointer-events", "none");
                $(".btnContinue").css("display", "block");
            }
        })
        .catch(function(err){
            console.log('Error:', err)
        });
    });
}
