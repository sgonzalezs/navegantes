$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    let age=identity.age;
    
    $("#questionVista").text();
    if(age<13){
        $("#questionVista").text("¿Has sentido pena o temor por cómo te ves?");
    }else{
        $("#questionVista").text("¿En qué momento me he sentido excluido o juzgado por cómo me veo, hablo o cómo me comporto?");
    }
    
    if(!localStorage.getItem("vista")){
        $("#formVista").on("submit", function(e){
            e.preventDefault();
            let data={
                id:identity._id,
                answer:$("#txtAnswerVista").val(),
                question:$("#questionVista").text(),
                sense:'vista',
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
                      localStorage.setItem('vista', JSON.stringify(
                        {
                            user_id:identity._id, 
                            sense:"vista", 
                            activity_1:true,
                            activity_2:true
                        }));
                  }
              })
              .catch(function(err){
                  console.log('Error:', err)
              });
        });
    }else{
        $(".alert").css("display", "block");
        $(".alert").text("Ya has completado esta sección");
        $(".btnContinue").css("display", "block");
        $(".btnSend").attr("disabled", true);
    }

});

// function getAvatarUser(){
//     let image=localStorage.getItem('userAvatar');

//     switch(image.split("/")[3]){
//         case "pirataMin_1.png":
//             $(".avatarSelected img").attr("src", image);
//             $(".avatarSelected img").css({
//                 "width": "80px",
//                 "margin":"0px 0px 0px 10px"
//             });
//         break;

//         case "pirataMin_2.png":
//             $(".avatarSelected img").attr("src", image);
//             $(".avatarSelected img").css({
//                 "width": "80px",
//                 "margin":"0px 0px 0px 10px"
//             });
//         break;

//         case "pirataMin_3.png":
//             $(".avatarSelected img").attr("src", image);
//             $(".avatarSelected img").css({
//                 "width": "70px",
//                 "margin":"0px 0px 0px 10px"
//             });
//         break;

//         case "pirataMin_4.png":
//             $(".avatarSelected img").attr("src", image);
//             $(".avatarSelected img").css({
//                 "width":"55px", 
//                 "margin":"6px 0px 0px 15px"
//             });
//         break;
//     }
// }