$(document).ready(function(){
    var image="";
    $(".myAvatar").click(function(){
        let attribute=$(this).attr('class');
        switch(attribute){
            case 'myAvatar myAvatar1':
                $(".avatarSelected img").attr("src", "public/images/avatar/pirataMin_1.png");
                $(".avatarSelected img").css({
                    "width": "80px",
                    "margin":"0px 0px 0px 10px"
                });
                image="pirataMin_1.png";
            break;

            case 'myAvatar myAvatar2':
                $(".avatarSelected img").attr("src", "public/images/avatar/pirataMin_2.png");
                $(".avatarSelected img").css({
                    "width": "80px",
                    "margin":"0px 0px 0px 10px"
                });
                image="pirataMin_2.png";
            break;

            case 'myAvatar myAvatar3':
                $(".avatarSelected img").attr("src", "public/images/avatar/pirataMin_3.png");
                $(".avatarSelected img").css({
                    "width": "70px",
                    "margin":"0px 0px 0px 10px"
                });
                image="pirataMin_3.png";
            break;

            case 'myAvatar myAvatar4':
                $(".avatarSelected img").attr("src", "public/images/avatar/pirataMin_4.png");
                $(".avatarSelected img").css({
                    "width":"55px", 
                    "margin":"6px 0px 0px 15px"
                });
                image="pirataMin_4.png";
            break;
        }
    });

    if(!localStorage.getItem('userAvatar')){
        $("#btnAvatar").on("click", function(){
            
            let email=localStorage.getItem('user');
    
            var data = {
                email,
                image
            };
    
            fetch('/inspiracioncomfama/avatar', {
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
                      window.location="/inspiracioncomfama/viaje";
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