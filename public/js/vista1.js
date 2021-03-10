$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    getValidate(identity, "vista");
});

var cAns=0;
function answerVista(identity){
    
    $(".option img").click(function(){
        $(this).css("border","3px solid #ffffff");
        $(this).css("opacity","0.8");
        var prop=$(this).attr("class");
        $("."+prop).css("pointer-events", "none");
        var question=$(this).attr("value").split("-")[0];
        var answer=$(this).attr("value").split("-")[1];
        
        let data={
            id:identity._id,
            question,
            answer:answer,
            sense:'vista',
            activity:'seleccion'
        }
        cAns++;
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
                    // $(".btnContinue").css("display", "block");
                    // $(".vistaContent").css("pointer-events", "none");
                    // $(".alert").css("display", "block");
                    // $(".alert").text("Ya has completado esta sección");
                    // getStatistics("vista", "seleccion");
                }
            }else{
                
                if(cAns==4){
                    $(".btnContinue").css("display", "block");
                    $(".vistaContent").css("pointer-events", "none");
                    getStatistics("vista", "seleccion");
                }
            }
        })
        .catch(function(err){
            console.log('Error:', err)
        });
    });
}

function getStatistics(sense, activity){
    fetch('/inspiracioncomfama/datos/'+sense+'&'+activity,{
        type:'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(function(res){
        return res.json();
    })
    .then(function(response){
        var info=response.data;
        var acum=[{
                "Vista1A":[{type:"A"}],
                "Vista2A":[{type:"A"}],
                "Vista1B":[{type:"B"}],
                "Vista2B":[{type:"B"}],
                "Vista1C":[{type:"C"}],
                "Vista2C":[{type:"C"}],
                "Vista1D":[{type:"D"}],
                "Vista2D":[{type:"D"}]
            }];
        $("div.statistic").css("display", "block");
        $("div.statistic").text("0");
        info.forEach(function(e,i){
            if(e.value==$("."+e.value).attr("class").split(" ")[1]){
                acum[0][e.value].push({el:e.value});
                $("."+e.value).text(acum[0][e.value].length-1);

                if($("."+e.value).text().length>=3){
                    $("div."+e.value).css({
                        "left":"20%"
                    });
                }
            }
        });
    })
    .catch(function(err){
        console.log(err);
    });
}

function getValidate(identity, sense){
    let user=identity._id;

    fetch("/inspiracioncomfama/seleccion/"+user+"&"+sense+"&seleccion",{
        type:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(function(res){
        return res.json();
    })
    .then(function(response){
        if(!response.ok){
            if(response.message=="not found"){
                answerVista(identity);
            }
        }
        if(response.data.length<4){
            answerVista(identity);
        }
        if(response.data.length==4){
            
            $(".btnContinue").css("display", "block");
            $(".vistaContent").css("pointer-events", "none");
            $(".alert").css("display", "block");
            $(".alert").text("Ya has completado esta sección");
            getStatistics("vista", "seleccion");
        }
    })
    .catch(function(err){
        console.log(err);
    });
}