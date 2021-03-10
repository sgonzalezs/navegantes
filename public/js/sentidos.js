$(document).ready(function(){
    detectDevice();
    var identity=JSON.parse(localStorage.getItem('identity'));
    // loadInspiradores(identity);
    getSensesComplete(identity);
    
    let image=localStorage.getItem('userAvatar');
    // switch(image){
    //     case "pirataMin_1.png":
    //         $("#avatarUser img").attr("src", image);
    //         $("#avatarUser img").css({
    //             "width": "80px",
    //             "margin":"0px 0px 0px 10px"
    //         });
    //     break;

    //     case "pirataMin_2.png":
    //         $("#avatarUser img").attr("src", image);
    //         $("#avatarUser img").css({
    //             "width": "80px",
    //             "margin":"0px 0px 0px 10px"
    //         });
    //     break;

    //     case "pirataMin_3.png":
    //         $("#avatarUser img").attr("src", image);
    //         $("#avatarUser img").css({
    //             "width": "70px",
    //             "margin":"0px 0px 0px 10px"
    //         });
    //     break;

    //     case "pirataMin_4.png":
    //         $("#avatarUser img").attr("src", image);
    //         $("#avatarUser img").css({
    //             "width":"55px", 
    //             "margin":"6px 0px 0px 15px"
    //         });
    //     break;
    // }

});

function getSensesComplete(identity){

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
                
            }
        }else{
            let trophies=response.message;
            let senses=[];
            
            trophies.forEach(function(e,i){
                var sense=trophies[i].sense;
                if(sense=="escucha"||sense=="vista"||sense=="tacto"||sense=="olfato"||sense=="gusto"){
                    senses.push(sense);
                }
                $("."+sense).css("pointer-events", "none");
                $("."+sense).attr("src", "public/images/sentidos/"+sense+"_checked.png");
            });
            if(senses.length==5){
                $(".alert").css("display", "block");
                $(".btnContinue").css("display", "block");
                $(".alert").text("Ya has completado todas las actividades de los sentidos");
            }
            
        }
    })
    .catch(function(err){
        console.log(err);
    }); 
}

function loadInspiradores(identity){

    var senses=JSON.parse(localStorage.getItem('senses'));
    
    if(senses){
        var validate={
            escucha:senses.escucha,
            vista:senses.vista,
            tacto:senses.tacto,
            olfato:senses.olfato,
            gusto:senses.gusto
        };
    
        if(validate.escucha && validate.vista &&validate.tacto &&validate.olfato &&validate.gusto){
            $(".alert").css("display", "block");
            $(".btnContinue").css("display", "block");
            $(".alert").text("Ya has completado todas las actividades de los sentidos");
            
            let data={
                id:identity._id,
                answer:"complete",
                question:"senses",
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
                        $(".alert").text("Ya has completado todas las actividades de los sentidos");
                    }
                }else{
                    $(".alert").css("display", "block");
                    $(".btnContinue").css("display", "block");
                    $(".alert").text("Ya has completado todas las actividades de los sentidos");
                }
            })
            .catch(function(err){
                console.log('Error:', err);
            });
        }
    }
}

function detectDevice(){
    var orientation=screen.orientation.type;
    if(orientation=="portrait-primary"){
        $("body section").css("display", "none");
        $("body").css({
            "background-size":"100% 100vh"
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
                "background-size":"100% 100vh"
            });
            $(".device").css("display", "block");
            $(".footer img").css({
                "position":"absolute",
            });
        }
        
        if(orientation2=="landscape-primary")
        {
            $("body section").css("display", "block");
            $(".device").css("display", "none");
            $("body").css({
                "background-size":"100% 130%"
            });
            $(".footer img").css({
                "position": "relative",
                "width": "220px"
            })
        }
    });
}
