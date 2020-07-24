$(document).ready(function(){
    getAvatarUser();
    let identity=JSON.parse(localStorage.getItem('identity'));

    $("#questionGusto").text();
    $("#questionGusto").text("¿A qué sabe la relación que tienes con tu familia?");

    $("#formGusto").on("submit", function(e){
        e.preventDefault();
        let data={
            id:identity._id,
            answer:$("#txtAnswerGusto").val(),
            sense:'gusto',
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