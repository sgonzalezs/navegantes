$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    
    let age=identity.age;
    
    $("#questionEscucha").text();
    if(age<13){
        $("#questionEscucha").text("¿Qué consecuencias has vivido por no escuchar a tus papás?");
    }else{
        $("#questionEscucha").text("¿Qué conflicto crees que se pudo evitar en tu barrio, si los involucrados se hubieran sentado a conversar, escuchando lo que el otro tiene para decir?");
    }
    let escucha=JSON.parse(localStorage.getItem('escucha'));
    if(!escucha.activity_2){
        $("#formEscucha").on("submit", function(e){
            e.preventDefault();
            let data={
                id:identity._id,
                answer:$("#txtAnswer").val(),
                question:$("#questionEscucha").text(),
                sense:'escucha',
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
                      localStorage.setItem('escucha', JSON.stringify(
                        {
                            user_id:identity._id, 
                            sense:"escucha", 
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

