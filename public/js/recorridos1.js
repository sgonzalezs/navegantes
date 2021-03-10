$(document).ready(function(){
    getDevice();
    let identity=JSON.parse(localStorage.getItem('identity'));
    // validateRecorridos(identity);
    getRecorridos(identity);
    // loadPremiacion(identity);
});

function getRecorridos(identity){
    let user=identity._id;
    fetch("/inspiracioncomfama/recorridos-validacion/"+user+"&recorridos", {
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(function(res){
        return res.json();
    })
    .then(function(response){
        if(response.ok){
            if(response.data.length>0){
                $(".alert").css("display", "block");
                $(".alert").text("Ya completaste al menos un recorrido. Puedes continuar.");
                $(".btnContinue").css("display", "block");
                
                response.data.forEach(function(e,i){
                    $("."+e.sense).attr("src","public/images/recorridos/"+e.sense+"_check.jpg");
                    $("."+e.sense).css("pointer-events", "none");
                });
            }
        }
    })
    .catch(function(err){
        console.log(err);
    });
}

function loadPremiacion(identity){
    let user=identity._id;
    let answer='complete';
    let question='recorridos';

    fetch('/inspiracioncomfama/senses/'+user+"&"+answer+"&"+question, {
        method: 'GET',
        headers:{
        'Content-Type': 'application/json'
        }
    })
    .then(function(res){
        return res.json();
    })
    .then(function(response){
        if(!response.ok){
            if(response.message=="not found"){

                $(".alert").css("display", "none");
                $(".btnContinue").css("display", "none");
                $(".alert").text("");
            }
        }else{
            
            $(".alert").css("display", "block");
            $(".alert").text("Haz clic en continuar");
            $(".btnContinue").css("display", "block");
        }
    })
    .catch(function(err){
        console.log('Error:', err);
    });
}

function validateRecorridos(identity){
    let recorridos=JSON.parse(localStorage.getItem('recorridos'));

    if(recorridos){
        let validate={
            apropiacion:recorridos.apropiacion,
            centro:recorridos.centro,
            conocimiento:recorridos.conocimiento,
        };

        if(validate.apropiacion && validate.centro &&validate.conocimiento){
            $(".alert").css("display", "block");
            $(".alert").text("Haz clic en continuar");
            $(".btnContinue").css("display", "block");

            let data={
                id:identity._id,
                answer:"complete",
                question:"recorridos",
                sense:'all',
                activity:'validate'
            };

            fetch('/inspiracioncomfama/respuesta', {
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
                    if(response.message=="exists"){
                        $(".alert").css("display", "block");
                        $(".btnContinue").css("display", "block");
                        $(".alert").text("Haz clic en continuar");
                    }
                }else{
                    $(".alert").css("display", "block");
                    $(".btnContinue").css("display", "block");
                    $(".alert").text("Haz clic en continuar");
                }
            })
            .catch(function(err){
                console.log('Error:', err);
            });
        }
    }
}

function getDevice(){
    var orientation=screen.orientation.type;
    if(orientation=="portrait-primary"){
        $("body section").css("display", "none");
        $(".device").css("display", "block");
    }else{
        $("body section").css("display", "block");
        $(".device").css("display", "none");
    }
    $(window).on("orientationchange",function( event ){
        var orientation2=screen.orientation.type;
        if(orientation2=="portrait-primary"){
            $("body section").css("display", "none");
            $(".device").css("display", "block");
        }else{
            $("body section").css("display", "block");
            $(".device").css("display", "none");
        }
    });
}