$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    let student=JSON.parse(localStorage.getItem('student'));
    let age=student.grade;
    var video=document.getElementById('video');
    
    if(age<6){
        video.src="https://www.youtube.com/embed/aXDpAnHuaxc";
    }else{
        video.src="https://www.youtube.com/embed/H88ZknJ4q5g";
    }
});