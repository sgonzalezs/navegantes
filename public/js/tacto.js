$(document).ready(function(){
    getAvatarUser();
    let identity=JSON.parse(localStorage.getItem('identity'));
    
    $("#questionTacto").text();
    $("#questionTacto").text("Con la Covid-19 se está replanteando a nivel mundial el contacto físico con los demás ¿cómo sientes que esto ha afectado tu relación con tus amigos más cercanos?.");

    $("#formTacto").on("submit", function(e){
        e.preventDefault();
        let data={
            id:identity._id,
            answer:$("#txtAnswerTacto").val(),
            sense:'tacto',
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
                  $(".alert").css("display", "block");
                  $(".alert").text(response.message);
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