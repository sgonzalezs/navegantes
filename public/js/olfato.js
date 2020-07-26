$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));

    $("#questionOlfato").text();
    $("#questionOlfato").text("¿Tienes a alguien para recordar? ¿con qué olor lo identificas?");
    let olfato=JSON.parse(localStorage.getItem('olfato'));
    
    if(!olfato.activity_2){
        $("#formOlfato").on("submit", function(e){
            e.preventDefault();
            let data={
                id:identity._id,
                question:"¿Tienes a alguien para recordar? ¿con qué olor lo identificas?",
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
                      $(".btnContinue").css("display", "block");
                      localStorage.setItem("olfato",JSON.stringify(
                        {
                            user_id:identity._id, 
                            sense:"olfato", 
                            activity_1:true,
                            activity_2:true
                        })
                    );
                  }
              })
              .catch(function(err){
                  console.log('Error:', err)
              });
        });
    }else{
        $(".btnContinue").css("display", "block");
        $(".btnSend").attr("disabled", true);
        $(".alert").css("display", "block");
        $(".alert").text("Ya has completado esta sección");
    }

});


