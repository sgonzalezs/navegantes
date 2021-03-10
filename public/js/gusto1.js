$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    getValidate(identity, "gusto");
});

var cAns=0;
function answerGusto(identity){

    $(".option img").click(function(){
        $(this).css("border","3px solid #ffffff");
        $(this).css("opacity","0.8");
        var prop=$(this).attr("class");
        $("."+prop).css("pointer-events", "none");
        var question=$(this).attr("value").split("-")[0];
        var answer=$(this).attr("value").split("-")[1];
        cAns++;
        let data={
            id:identity._id,
            question,
            answer:answer,
            sense:'gusto',
            activity:'seleccion'
        }

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
                    // $(".gustoContent").css("pointer-events", "none");
                    // $(".alert").css("display", "block");
                    // $(".alert").text("Ya has completado esta sección");
                    // getStatistics("gusto", "seleccion");
                }
            }else{
                
                if(cAns==5){
                    $(".btnContinue").css("display", "block");
                    $(".gustoContent").css("pointer-events", "none");
                    getStatistics("gusto", "seleccion");
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
                "Gusto1A":[],
                "Gusto2A":[],
                "Gusto1B":[],
                "Gusto2B":[],
                "Gusto1C":[],
                "Gusto2C":[],
                "Gusto1D":[],
                "Gusto2D":[],
                "Gusto1E":[],
                "Gusto2E":[]
            }];
        $("div.statistic").css("display", "block");
        $("div.statistic").text("0");
        var staticA=0;
        var staticB=0;
        var staticC=0;
        var staticD=0;
        info.forEach(function(e,i){
            if(e.value==$("."+e.value).attr("class").split(" ")[1]){
                acum[0][e.value].push({el:e.value});
                
                $("."+e.value).text(acum[0][e.value].length);
                
                // staticA=100/((acum[0]["Gusto1A"].length-1)+(acum[0]["Gusto2A"].length-1));
                // staticB=100/((acum[0]["Gusto1B"].length-1)+(acum[0]["Gusto2B"].length-1));
                // staticC=100/((acum[0]["Gusto1C"].length-1)+(acum[0]["Gusto2C"].length-1));
                // staticD=100/((acum[0]["Gusto1D"].length-1)+(acum[0]["Gusto2D"].length-1));
            }
            if($("."+e.value).text().length>=3){
                $("div."+e.value).css({
                    "left":"0%"
                });
            }
            // console.log(acum);
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
                answerGusto(identity);
            }
        }
        if(response.data.length<5){
            answerGusto(identity);
        }else{
            $(".btnContinue").css("display", "block");
            $(".gustoContent").css("pointer-events", "none");
            $(".alert").css("display", "block");
            $(".alert").text("Ya has completado esta sección");
            getStatistics("gusto", "seleccion");
        }
    })
    .catch(function(err){
        console.log(err);
    });
}