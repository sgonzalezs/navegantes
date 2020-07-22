$(document).ready(function(){
    getAvatarUser();
    let identity=JSON.parse(localStorage.getItem('identity'));
    // console.log(identity);
    let age=identity.age;
    
    $("#questionEscucha").text();
    if(age<13){
        $("#questionEscucha").text("¿Qué consecuencias has vivido por no escuchar a tus papás?");
    }else{
        $("#questionEscucha").text("¿Qué conflicto crees que se pudo evitar en tu barrio, si los involucrados se hubieran sentado a conversar, escuchando lo que el otro tiene para decir?");
    }

    $("#formEscucha").on("submit", function(e){
        e.preventDefault();

        let data={
            id:identity._id,
            answer:$("#txtAnswer").val(),
            sense:'escucha'
        }

        fetch('/escucha', {
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
                  console.log(response.message);
                  $(".btnContinueEscucha").css("display", "block");
                //   localStorage.setItem('userAvatar', image);
                //   window.location="sentido";
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