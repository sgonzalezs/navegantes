$(document).ready(function(){
    getDevice();
    let identity=JSON.parse(localStorage.getItem('identity'));
    getSensesComplete(identity);
    getVotesvalidate(identity)
});

function getVotesvalidate(identity){
    let user=identity._id;

    fetch("/inspiracioncomfama/validate-votes/"+user, {
        type:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(function(res){
        return res.json();
    })
    .then(function(response){
        if(response.ok){
            var data=[];
            response.data.forEach(function(e,i){
                var category=e.category;
                if(category=="Cuerpo" || category=="Arte" || category=="Sociedad" || category=="Ciencia"){
                    data.push(category);  
                }
                var inspiring=e.inspiring.split(" ")[0];
                $("."+inspiring).attr("src", "public/images/inspiracion/personas/"+inspiring+"_check.jpg");
                $("."+inspiring).css("pointer-events", "none");
            });
            
            var data_filter = data.filter( onlyUnique );
            if(data_filter.length==4){
                $(".alert").css("display", "block");
                $(".alert").text("Haz clic en continuar");
                $(".btnContinue").css("display", "block");
            }
        }
    })
    .catch(function(err){

    });
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

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
                console.log("response error");
            }
        }else{
            let trophies=response.message;
            let senses=[];
            
            trophies.forEach(function(e,i){
                var sense=trophies[i].sense;
                if(sense=="escucha"||sense=="vista"||sense=="tacto"||sense=="olfato"||sense=="gusto"){
                    senses.push(sense);
                }
                // $("."+sense).css("pointer-events", "none");
                // $("."+sense).attr("src", "../images/sentidos/"+sense+"_checked.png");
            });
            if(senses.length<5){
                $(".alert").css("display", "block");
                $(".redirectInspirings").attr("href", "/sentido");
                $(".btnContinue").css("display", "block");
                $(".alert").text("Debes completar todos los sentidos para continuar con esta sección");
                $(".imagesSection").css("pointer-events", "none");
            }
            
        }
    })
    .catch(function(err){
        console.log(err);
    }); 
}

function getDevice(){
    var orientation=screen.orientation.type;
    if(orientation=="portrait-primary"){
        $("body>section").css("display", "none");
        $(".device").css("display", "block");
    }else{
        $("body>section").css("display", "block");
        $(".device").css("display", "none");
    }
    $(window).on("orientationchange",function( event ){
        var orientation2=screen.orientation.type;
        if(orientation2=="portrait-primary"){
            $("body>section").css("display", "none");
            $(".device").css("display", "block");
        }else{
            $("body>section").css("display", "block");
            $(".device").css("display", "none");
        }
    });
}