const express=require('express');
const User=require("../models/user.js");
const Quest=require("../models/questions.js");
const Inspiring=require("../models/inspiring.js");

//token config
const jwt=require("jsonwebtoken");
const { verifyToken } = require('../middlewares/auth.js');

const app=express();

app.get("/", (req,res)=>{
    res.sendFile('index.html', {root:'public/'});
});

app.get("/avatar", (req,res)=>{
    res.sendFile("avatar.html", {root: 'public/'});
});

app.get("/sentido", (req,res)=>{
    res.sendFile("sentidos.html", {root: 'public/'});
});

// Rutas Sentido Escucha
app.get("/escucha", (req,res)=>{
    res.sendFile("musica.html", {root:"public/sentidos/escucha"});
});
app.get("/escucha-reflexion", (req,res)=>{
    res.sendFile("index.html", {root:"public/sentidos/escucha"});
});

app.get("/escucha-recompensas", (req,res)=>{
    res.sendFile("recompensas.html", {root:"public/sentidos/escucha"});
});

// app.get("/sentido/escucha", (req,res)=>{
//     res.sendFile("musica.html", {root:"public/sentidos/escucha"});
// });
// --------------------------------------

//Rutas Sentido Vista
app.get("/vista", (req,res)=>{
    res.sendFile("index.html", {root:"public/sentidos/vista"});
});

app.get("/vista-recompensas", (req,res)=>{
    res.sendFile("recompensas.html", {root:"public/sentidos/vista"});
});
// ----------------------------------------

// Rutas Sentido Tacto
app.get("/tacto", (req,res)=>{
    res.sendFile("tacto.html", {root:"public/sentidos/tacto"});
});

app.get("/tacto-reflexion", (req,res)=>{
    res.sendFile("index.html", {root:"public/sentidos/tacto"});
});

app.get("/tacto-recompensas", (req,res)=>{
    res.sendFile("recompensas.html", {root:"public/sentidos/tacto"});
});
// -------------------------------------------

// Rutas Sentido Olfato------------------------------
app.get("/olfato", (req,res)=>{
    res.sendFile("olfato.html", {root:"public/sentidos/olfato"});
});

app.get("/olfato-reflexion", (req,res)=>{
    res.sendFile("index.html", {root:"public/sentidos/olfato"});
});

app.get("/olfato-recompensas", (req,res)=>{
    res.sendFile("recompensas.html", {root:"public/sentidos/olfato"});
});
// --------------------------------------------------

// Ruras Sentido Gusto
app.get("/gusto", (req,res)=>{
    res.sendFile("gusto.html", {root:"public/sentidos/gusto"});
});

app.get("/gusto-reflexion", (req,res)=>{
    res.sendFile("index.html", {root:"public/sentidos/gusto"});
});

app.get("/gusto-recompensas", (req,res)=>{
    res.sendFile("recompensas.html", {root:"public/sentidos/gusto"});
});

// Sentidos
app.get("/sentidos-reflexion", (req,res)=>{
    res.sendFile("reflexion.html", {root:"public/"});
});

// Configuracion
app.get("/ajuste", (req,res)=>{
    res.sendFile("ajuste.html", {root:"public/"});
});

// Inspiracion
app.get("/inspiraciones", (req,res)=>{
    res.sendFile("inspiracion.html", {root:"public"});
});

app.get("/catalina-arroyave", (req,res)=>{
    res.sendFile("catalina.html", {root:"public/inspiracion"});
});

app.get("/maria-camila-trillos", (req,res)=>{
    res.sendFile("mcamila.html", {root:"public/inspiracion"});
});

app.get("/boyka", (req,res)=>{
    res.sendFile("boyka.html", {root:"public/inspiracion"});
});

app.get("/juan-pablo-valencia", (req,res)=>{
    res.sendFile("jpablo.html", {root:"public/inspiracion"});
});

app.get("/jke", (req,res)=>{
    res.sendFile("jke.html", {root:"public/inspiracion"});
});

app.get("/brigitte-baptiste", (req,res)=>{
    res.sendFile("brigette.html", {root:"public/inspiracion"});
});

app.get("/arex", (req,res)=>{
    res.sendFile("arex.html", {root:"public/inspiracion"});
});

app.get("/melissa-toro", (req,res)=>{
    res.sendFile("mtoro.html", {root:"public/inspiracion"});
});


app.get("/votos/:user", (req,res)=>{
    let user=req.params.user;
    Inspiring.findOne({name:user}, (err, dataFounded)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:err
            });
        }

        if(dataFounded){
            return res.status(200).json({
                ok:true,
                data:dataFounded
            });
        }
    });
});

app.post("/votacion", (req,res)=>{
    let body=req.body;

    Inspiring.findOne({name:body.name}, (err, dataFounded)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:err
            });
        }

        if(dataFounded){
            var changes={};
            let value=parseInt(dataFounded.like+1);
            if(body.option=="like"){
                changes={
                    like:value
                };
            }else{
                changes={
                    dislike:value
                };
            }

            Inspiring.findOneAndUpdate({name:body.name},changes, (err, dataUpdated)=>{
                if(err){
                    return res.status(400).json({
                        ok:false,
                        message:err
                    });
                }
                return res.status(200).json({
                    ok:true,
                    data:changes
                });
            });
        }else{
            return res.status(404).json({
                ok:false,
                message:"Datos no encontrados"
            });
        }
    });
});

app.post("/respuesta", (req,res)=>{
    let body=req.body;
    let question=new Quest({
        user:body.id,
        question:body.question,
        sense:body.sense,
        value:body.answer,
        activity:body.activity
    })
    
    question.save((err,answerStored)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:err
            });
        }

        return res.status(200).json({
            ok:true,
            message:"Felicidades, has alcanzado un nuevo nivel de exploración."
        });
    });
});

app.post("/registro", (req,res)=>{
    let body=req.body;

    User.findOne({email:body.email}, (err, currentUser)=>{
		if(err){
			return res.status(400).json({
				ok:false,
				message:err
			});
		}

		if(currentUser){
            let token=jwt.sign({
                user:currentUser
            }, 'SECREET-SEED-999',{expiresIn:60*60*24*30});
            return res.status(200).json({
                ok:true,
                message:"login",
                user:currentUser,
                token
            });
		}else{
			let user=new User({
				name:body.name,
				email:body.email,
				age:body.age
			});
			user.save((error, newUser)=>{
				if(error){
					return res.status(400).json({
						ok:false,
						message:error
					});
				}
				let token=jwt.sign({
					user:newUser
				}, 'SECREET-SEED-999',{expiresIn:60*60*24*30});
				return res.status(200).json({
                    ok:true,
                    message:"created",
					user:newUser,
					token
				});
			});
		}
	});
});

app.put("/avatar", (req,res)=>{
    let body=req.body;
    
    User.findOneAndUpdate({email:body.email},{image:body.image}, (err, userUpdated)=>{
        if(err){
            return res.status(400).json({
				ok:false,
				message:err
			});
        }

        return res.status(200).json({
            ok:true,
            user:userUpdated
        });
    });

});

module.exports=app;