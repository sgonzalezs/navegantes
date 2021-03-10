$(document).ready(function(){
    getUserInfo();
});

function getUserInfo(){
    let indentity=JSON.parse(localStorage.getItem('identity'));
    $(".userName").text(indentity.name);
    $(".userEmail").text(indentity.email);

    fetch('/inspiracioncomfama/premios/'+indentity._id,{
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
                $(".trophiesGroup").append(`
                    <div class="col-md-12">
                        <p>No se han encontrado trofeos</p>
                    </div>
                `);
            }
        }else{
            let trophies=response.message;
            let senses=[];
            $(".trophiesGroup").empty();
            $("p.points").text(0);
            var points=0;
            trophies.forEach(function(e,i){
                var sense=trophies[i].sense;
                if(sense=="escucha"||sense=="vista"||sense=="tacto"||sense=="olfato"||sense=="gusto"){
                    senses.push(sense);
                }
                points=points+e.point;
                $("p.points").text(points);
                $(".trophiesGroup").append(`
                    <div class="col-sm-4">
                        <p>${e.sense}</p>
                        <img src="public/images/premios/${e.trophy}" width="80">
                    </div>
                `);
            });
            if(senses.length==5){
                $(".btnContinueSentidos").css("display", "block");
            }
        }
    })
    .catch(function(err){
        console.log(err);
    });
}

function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('identity');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('senses');
    localStorage.removeItem('inspiring');
    localStorage.removeItem('recorridos');
    localStorage.removeItem('videos');

    window.location="/inspiracioncomfama/";
}
