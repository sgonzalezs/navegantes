$(document).ready(function(){
    
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