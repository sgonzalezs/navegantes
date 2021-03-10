$(document).ready(function(){
    getDevice();
    getLandscape();
	$('.document, .phone').on('input', function () { 
		this.value = this.value.replace(/[^0-9]/g,'');
	});

	$(".login").click(function(){
		$("#formIngresa").css("display", "none");
		$("#formLogin").css("display", "block");

		$(".alertMessage").css("display", "none");
		$(".alertMessage").text("");
	});

	$(".register").click(function(){
		$("#formIngresa").css("display", "block");
		$("#formLogin").css("display", "none");

		$(".alertMessage").css("display", "none");
		$(".alertMessage").text("");
	});

    $("#formIngresa").on('submit', function(e){
		e.preventDefault();
		
		if($(".document").val().length<5)
		{
			$(".alertMessage").text("");
			$(".alertMessage").css("display", "block");
			$(".alertMessage").text("El documento debe tener Minimo 5 caracteres");
		}
		else if($(".phone").val().length<10)
		{
			$(".alertMessage").text("");
			$(".alertMessage").css("display", "block");
			$(".alertMessage").text("El Whatsapp debe tener Minimo 10 caracteres");
		
		}
		else
		{
			var data = {
				name: $("#txtName").val(),
				email: $("#txtEmail").val(),
				type_doc:$("#slc_document").val(),
				document:$("#n_document").val(),
				number:$("#txt_number").val(),
				parent_name:$("#txt_nameParent").val(),
				parent_doc:$("#txt_docParent").val()
			};
	
			fetch('/inspiracioncomfama/registro', {
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
					if(response.message=="student not found"){
						$(".alertMessage").css("display", "block");
						$(".alertMessage").text("El estudiante no está registrado en la base de datos del colegio");
					}else{
						$(".alertMessage").css("display", "block");
						$(".alertMessage").text("Error al ingresar, revisa la información");
					}
				}else{

					if(response.message=="login"){
						$(".alertMessage").css("display", "block");
						$(".alertMessage").text("ya existe un usuario con estos datos");
						// let identity=JSON.parse(localStorage.getItem('identity'))
						// localStorage.setItem('userAvatar', identity.image);
						// window.location.replace('/viaje');
					}else{
						localStorage.setItem('token', response.token);
						localStorage.setItem('user', response.user.email);
						localStorage.setItem('identity', JSON.stringify(response.user));
						localStorage.setItem('student', JSON.stringify(response.student));
						window.location.replace('/inspiracioncomfama/avatar');	
					}
				}
			})
			.catch(function(err){
				console.log('Error:', err)
			});
		}
	});
	
	$("#formLogin").on('submit', function(e){
		e.preventDefault();
		
		var data = {
			document: $("#documentLogin").val(),
			email: $("#emailLogin").val()
		};

		fetch('/inspiracioncomfama/login', {
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
				if(response.message=="not found"){
					$(".alertMessage").css("display", "block");
					$(".alertMessage").text("No existe ningun usuario con estos datos");
				}
				if(response.message=="student not found"){
					$(".alertMessage").css("display", "block");
					$(".alertMessage").text("El estudiante no está registrado en la base de datos del colegio");
				}
			}else{
				if(response.message=="login"){
					localStorage.setItem('token', response.token);
					localStorage.setItem('user', response.user.email);
					localStorage.setItem('identity', JSON.stringify(response.user));
					localStorage.setItem('student', JSON.stringify(response.student));
					
					let identity=JSON.parse(localStorage.getItem('identity'))
					localStorage.setItem('userAvatar', identity.image);
					window.location.replace('/inspiracioncomfama/viaje');
				}

				if(response.message=="admin login"){
					window.location="/inspiracioncomfama/administracion";
					localStorage.setItem('token', response.token);
					localStorage.setItem('user', response.user.email);
					localStorage.setItem('identity', JSON.stringify(response.user));
				}
			}
		})
		.catch(function(err){
			console.log('Error:', err)
		});
    });
});

function getDevice(){
    var orientation=screen.orientation.type;
    if(orientation=="portrait-primary"){
        $("body section").css("display", "none");
        $("body").css({
            "background-image": "url('./public/images/fondo/Fondo.png')",
            "background-size": "cover",
            "background-repeat":"no-repeat",
            "background-size": "100% 100vh"
        });
        $(".device").css("display", "block");
    }else{
        $("body section").css("display", "block");
        $("body").css({
            "background-image": "url('./public/images/fondo/FondoCompleto.png')",
            "background-size": "cover",
            "background-repeat":"no-repeat",
            "background-size": "100% 100vh"
        });
        $(".device").css("display", "none");
    }
    $(window).on("orientationchange",function( event ){
        var orientation2=screen.orientation.type;
        if(orientation2=="portrait-primary"){
            $("body section").css("display", "none");
            $("body").css({
                "background-image": "url('./public/images/fondo/Fondo.png')",
                "background-size": "cover",
                "background-repeat":"no-repeat",
                "background-size": "100% 100vh"
            });
            $(".device").css("display", "block");
        }else{
            $("body section").css("display", "block");
            $("body").css({
                "background-image": "url('./public/images/fondo/FondoCompleto.png')",
                "background-size": "cover",
                "background-repeat":"no-repeat",
                "background-size": "100% auto"
            });
            $(".device").css("display", "none");
        }
    });
}

function getLandscape(){

	switch (window.orientation) {
	    case 0:
	        $("body section").css("display", "none");
	        $("body").css({
	            "background-image": "url('./public/images/fondo/Fondo.png')",
	            "background-size": "cover",
	            "background-repeat":"no-repeat",
	            "background-size": "100% 100vh"
	        });
	        $(".device").css("display", "block");
        break; 
        
	    case 180:
	        $("body section").css("display", "none");
	        $("body").css({
	            "background-image": "url('./public/images/fondo/Fondo.png')",
	            "background-size": "cover",
	            "background-repeat":"no-repeat",
	            "background-size": "100% 100vh"
	        });
	        $(".device").css("display", "block");
        break; 
  
	    case -90:
	        $("body section").css("display", "block");
	        $("body").css({
	            "background-image": "url('./public/images/fondo/FondoCompleto.png')",
	            "background-size": "cover",
	            "background-repeat":"no-repeat",
	            "background-size": "100% auto"
	        });
	        $(".device").css("display", "none");
        break;  
  
	    case 90:
	        $("body section").css("display", "block");
	        $("body").css({
	            "background-image": "url('./public/images/fondo/FondoCompleto.png')",
	            "background-size": "cover",
	            "background-repeat":"no-repeat",
	            "background-size": "100% auto"
	        });
	        $(".device").css("display", "none");
        break;
    }

    $(window).on("orientationchange",function( event ){
        switch (window.orientation) {
		    case 0:
		        $("body section").css("display", "none");
		        $("body").css({
		            "background-image": "url('./public/images/fondo/Fondo.png')",
		            "background-size": "cover",
		            "background-repeat":"no-repeat",
		            "background-size": "100% 100vh"
		        });
		        $(".device").css("display", "block");
	        break; 
	        
		    case 180:
		        $("body section").css("display", "none");
		        $("body").css({
		            "background-image": "url('./public/images/fondo/Fondo.png')",
		            "background-size": "cover",
		            "background-repeat":"no-repeat",
		            "background-size": "100% 100vh"
		        });
		        $(".device").css("display", "block");
	        break; 
	  
		    case -90:
		        $("body section").css("display", "block");
		        $("body").css({
		            "background-image": "url('./public/images/fondo/FondoCompleto.png')",
		            "background-size": "cover",
		            "background-repeat":"no-repeat",
		            "background-size": "100% auto"
		        });
		        $(".device").css("display", "none");
	        break;  
	  
		    case 90:
		        $("body section").css("display", "block");
		        $("body").css({
		            "background-image": "url('./public/images/fondo/FondoCompleto.png')",
		            "background-size": "cover",
		            "background-repeat":"no-repeat",
		            "background-size": "100% auto"
		        });
		        $(".device").css("display", "none");
	        break;
	    }
    });
}
