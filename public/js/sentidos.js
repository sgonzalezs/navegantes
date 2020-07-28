$(document).ready(function(){
    loadInspiradores();
    let image=localStorage.getItem('userAvatar');
    switch(image.split("/")[3]){
        case "pirataMin_1.png":
            $("#avatarUser img").attr("src", image);
            $("#avatarUser img").css({
                "width": "80px",
                "margin":"0px 0px 0px 10px"
            });
        break;

        case "pirataMin_2.png":
            $("#avatarUser img").attr("src", image);
            $("#avatarUser img").css({
                "width": "80px",
                "margin":"0px 0px 0px 10px"
            });
        break;

        case "pirataMin_3.png":
            $("#avatarUser img").attr("src", image);
            $("#avatarUser img").css({
                "width": "70px",
                "margin":"0px 0px 0px 10px"
            });
        break;

        case "pirataMin_4.png":
            $("#avatarUser img").attr("src", image);
            $("#avatarUser img").css({
                "width":"55px", 
                "margin":"6px 0px 0px 15px"
            });
        break;
    }

});

function loadInspiradores(){
    var sessions=[
        JSON.parse(localStorage.getItem('escucha')).activity_2,
        JSON.parse(localStorage.getItem('tacto')).activity_2,
        JSON.parse(localStorage.getItem('vista')).activity_2,
        JSON.parse(localStorage.getItem('olfato')).activity_2,
        JSON.parse(localStorage.getItem('gusto')).activity_2,
    ];
    for(var i=0; i<=4; i++){
        if(sessions[i]){
            $(".alert").css("display", "block");
            $(".btnContinue").css("display", "block");
            $(".alert").text("Ya has completado todas las actividades de los sentidos");
        }
    }
}