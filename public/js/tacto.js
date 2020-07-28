$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    
    $("#questionTacto").text();
    $("#questionTacto").text("Con la Covid-19 se está replanteando a nivel mundial el contacto físico con los demás ¿cómo sientes que esto ha afectado tu relación con tus amigos más cercanos?.");
    let tacto=JSON.parse(localStorage.getItem('tacto'));
    if(!tacto.activity_2){
        $("#formTacto").on("submit", function(e){
            e.preventDefault();
            let data={
                id:identity._id,
                answer:$("#txtAnswerTacto").val(),
                question:$("#questionTacto").text(),
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
                      localStorage.setItem('tacto', JSON.stringify(
                        {
                            user_id:identity._id, 
                            sense:"tacto", 
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
        $(".alert").text('Ya has completado esta sección');
        $(".btnContinue").css("display", "block");
        $(".btnSend").attr("disabled", true);
    }

});
