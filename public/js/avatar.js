$(document).ready(function(){

    $(".myAvatar").click(function(){
        let attribute=$(this).attr('class');
        switch(attribute){
            case 'myAvatar myAvatar1':
                $(".avatarSelected img").attr("src", "./images/avatar/pirataMin_1.png");
                $(".avatarSelected img").css({
                    "width": "80px",
                    "margin":"0px 0px 0px 10px"
                });
            break;

            case 'myAvatar myAvatar2':
                $(".avatarSelected img").attr("src", "./images/avatar/pirataMin_2.png");
                $(".avatarSelected img").css({
                    "width": "80px",
                    "margin":"0px 0px 0px 10px"
                });
            break;

            case 'myAvatar myAvatar3':
                $(".avatarSelected img").attr("src", "./images/avatar/pirataMin_3.png");
                $(".avatarSelected img").css({
                    "width": "70px",
                    "margin":"0px 0px 0px 10px"
                });
            break;

            case 'myAvatar myAvatar4':
                $(".avatarSelected img").attr("src", "./images/avatar/pirataMin_4.png");
                $(".avatarSelected img").css({
                    "width":"55px", 
                    "margin":"6px 0px 0px 15px"
                });
            break;
        }
    });

    if(!localStorage.getItem('userAvatar')){
        $("#btnAvatar").on("click", function(){
            let image=$(".avatarSelected img").attr("src");
            let email=localStorage.getItem('user');
    
            var data = {
                email,
                image
            };
    
            fetch('/avatar', {
                method: 'PUT', 
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
                      console.log(response.message);
                  }else{
                      localStorage.setItem('userAvatar', image);
                      window.location="sentido";
                  }
              })
              .catch(function(err){
                  console.log('Error:', err)
              });
        });
    }else{
        $(".avatarSelect").css("pointer-events", "none");
        $("#btnAvatar").css("display", "none");

        $(".alert").css("display", "block");
        $(".alert").text("ya has seleccionado tu avatar");
        $(".btnContinue").css("display", "block");
    }

});