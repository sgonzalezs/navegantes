$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    getValidate(identity, "olfato");
    
});

var cAns=0;
function answerOlfato(identity){

    $(".option img").click(function(){
        $(this).css("border","3px solid #ffffff");
        $(this).css("opacity","0.8");
        var question=$(this).attr("value").split("-")[0];
        var answer=$(this).attr("value").split("-")[1];
        
        let prop=$(this).attr("class");
        $(this).css("box-shadow","0px 0px 5px 0px rgba(0,0,0,0.75)");
        $("."+prop).css("pointer-events", "none");

        let data={
            id:identity._id,
            question,
            answer:answer,
            sense:'olfato',
            activity:'seleccion'
        };
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
                    // $(".olfatoContent").css("pointer-events", "none");
                    // $(".alert").css("display", "block");
                    // $(".alert").text("Ya has completado esta sección");
                    // getStatistics("olfato", "seleccion");
                }
            }else{
                $(this).css("box-shadow","0px 0px 5px 0px rgba(0,0,0,0.75)");
                
                if(cAns==4){
                    $(".btnContinue").css("display", "block");
                    $(".olfatoContent").css("pointer-events", "none");
                    getStatistics("olfato", "seleccion");
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
                "Olfato1A":[{type:"A"}],
                "Olfato2A":[{type:"A"}],
                "Olfato1B":[{type:"B"}],
                "Olfato2B":[{type:"B"}],
                "Olfato1C":[{type:"C"}],
                "Olfato2C":[{type:"C"}],
                "Olfato1D":[{type:"D"}],
                "Olfato2D":[{type:"D"}]
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
                answerOlfato(identity);
            }
        }
        if(response.data.length<4){
            answerOlfato(identity);
        }else{
            $(".btnContinue").css("display", "block");
            $(".olfatoContent").css("pointer-events", "none");
            $(".alert").css("display", "block");
            $(".alert").text("Ya has completado esta sección");
            getStatistics("olfato", "seleccion");
        }

    })
    .catch(function(err){
        console.log(err);
    });
}