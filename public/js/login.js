$(document).ready(function(){

    $("#formLogin").on('submit', function(e){
        e.preventDefault();

        var data = {
			name: $("#txtName").val(),
			email: $("#txtEmail").val(),
			age: $("#txtAge").val()
		};

		fetch('/registro', {
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
                console.log(response.message);
			}else{
				// localStorage.removeItem('user');
				localStorage.setItem('token', response.token);
				localStorage.setItem('user', response.user.email);
				localStorage.setItem('identity', JSON.stringify(response.user));
				if(response.message=="login"){
					let identity=JSON.parse(localStorage.getItem('identity'))
					localStorage.setItem('userAvatar', identity.image);
					window.location.replace('/sentido');
				}else{
					window.location.replace('/avatar');	
				}
			}
		})
		.catch(function(err){
			console.log('Error:', err)
		});

    })

});