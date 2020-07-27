$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));

    $("#questionGusto").text();
    $("#questionGusto").text("¿A qué sabe la relación que tienes con tu familia?");
    let gusto=JSON.parse(localStorage.getItem("gusto"));
    if(!gusto.activity_2){
        $("#formGusto").on("submit", function(e){
            e.preventDefault();
            let data={
                id:identity._id,
                answer:$("#txtAnswerGusto").val(),
                question:$("#questionGusto").text(),
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
                      localStorage.setItem("gusto",JSON.stringify(
                        {
                            user_id:identity._id, 
                            sense:"gusto", 
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
        $(".alert").css("display", "block");
        $(".alert").text("Ya has completado esta sección");
        $(".btnContinue").css("display", "block");
        $(".btnSend").attr("disabled", true);
    }

});

