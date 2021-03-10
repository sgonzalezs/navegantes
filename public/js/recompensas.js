$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem("identity"));
    validateReflection(identity)
});

function validateReflection(identity){
    fetch('/premio', {
        method: 'GET', 
        body: JSON.stringify(data),
        headers:{
        'Content-Type': 'application/json'
        }
    })
    .then(function(res){
        return res.json();
    })
    .then(function(response){

        window.location="/inspiracioncomfama/sentido";
        
    })
    .catch(function(err){
        console.log(err);
    });
}