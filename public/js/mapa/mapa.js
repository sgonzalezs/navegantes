$(document).ready(function(){
    detectDevice();
    var identity=JSON.parse(localStorage.getItem('identity'));
    $(".imgLevel").css("pointer-events", "none");
    getSensesvalidate(identity);
});

function getSensesvalidate(identity){

    fetch('/inspiracioncomfama/premios/'+identity._id,{
        method:'GET',
        headers:{
            'Content-type':'application/json'
        }
    })
    .then(function(res){
        return res.json();
    })
    .then(function(response){
        if(!response.ok){
            if(response.message=="No data"){
                console.log(404);
            }
        }else{
            let trophies=response.message;
            let senses=[];
            
            var insp="";
            trophies.forEach(function(e,i){
                var sense=trophies[i].sense;
                if(sense=="escucha"||sense=="vista"||sense=="tacto"||sense=="olfato"||sense=="gusto"){
                    senses.push(sense);
                }

                if(sense=="inspiradores"){
                    insp=sense;
                }
            });
            if(senses.length==5){
                $(".imgInspiradores").attr("src", "public/images/mapa2/2InspiradoresAct.png");
            }else{
                $(".imgInspiradores").css("pointer-events", "none");
            }

            if(insp=="inspiradores"){
                $(".imgRecorridos").css("display","block");
                $(".imgMapa").attr("src","public/images/mapa2/Fondo.png");
            }else{
                $(".imgRecorridos").css("pointer-events", "none");
            }
            
        }
    })
    .catch(function(err){
        console.log(err);
    }); 
}

function detectDevice(){
    var orientation=screen.orientation.type;
    if(orientation=="portrait-primary"){
        $("body section").css("display", "none");
        $("body").css({
            "background-image": "url('public/images/fondo/Fondo.png')",
            "background-size": "cover",
            "background-repeat":"no-repeat",
            "background-size": "100% 100vh"
        });
        $(".device").css("display", "block");
        $(".footer img").css({
            "position":"absolute"
        });
    }
    
    $(window).on("orientationchange",function( event ){
        var orientation2=screen.orientation.type;
        if(orientation2=="portrait-primary"){
            $("body section").css("display", "none");
            $("body").css({
                "background-image": "url('public/images/fondo/Fondo.png')",
                "background-size": "cover",
                "background-repeat":"no-repeat",
                "background-size": "100% 100vh"
            });
            $(".device").css("display", "block");
            $(".footer img").css({
                "position":"absolute",
            });
        }
        
        if(orientation2=="landscape-primary")
        {
            $("body section").css("display", "block");
            $("body").css({
                "background-image": "url('.public/images/avatar/fondo_2.png')",
                "background-size": "cover",
                "background-repeat":"no-repeat",
                "background-size": "100% 100%"
            });
            $(".device").css("display", "none");
            $(".footer img").css({
                "position": "relative",
                "width": "220px"
            })
        }
    });
}