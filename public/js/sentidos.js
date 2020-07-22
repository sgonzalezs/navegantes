$(document).ready(function(){
    let current_user=JSON.parse(localStorage.getItem('identity'));
    let image=localStorage.getItem('userAvatar');

    $("#avatarUser img").attr("src", image);
    $("#avatarUser img").css({
        "width": "70px",
        "margin":"0px 0px 0px 10px"
    });

});