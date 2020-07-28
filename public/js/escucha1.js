$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    answerMusica(identity);
});

function answerMusica(identity){
    if(!localStorage.getItem('escucha')){
        $(".btnAudio").click(function(){
            let track=$(this).attr("value");
            let data={
                id:identity._id,
                answer:track,
                question:"Escucha los fragmentos de canciones y selecciona tu favorita.",
                sense:'escucha',
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
                    $(".btnAudio").attr("disabled", true);
                    $(".btnContinue").css("display", "block");
                    localStorage.setItem('escucha', JSON.stringify(
                        {
                            user_id:identity._id, 
                            sense:"escucha", 
                            activity_1:true,
                            activity_2:false
                        }));
                }
            })
            .catch(function(err){
                console.log('Error:', err)
            });
        });
    }else{
        $(".btnAudio").attr("disabled", true);
        $(".btnContinue").css("display", "block");
        $(".alert").css("display", "block");
        $(".alert").text("Ya has completado esta sección");
    }
    
}