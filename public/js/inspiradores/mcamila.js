$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    let age=identity.age;
    var video=document.getElementById('videoLoad');
    
    if(age<13){
        video.src="../media/inspiracion/Maria Camila Trillos-Primaria.mp4";
    }else{
        video.src="../media/inspiracion/Maria Camila Trillos-Bachillerato.mp4";
    }
});