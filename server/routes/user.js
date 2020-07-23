const express=require('express');
const User=require("../models/user.js");
const Question=require("../models/questions.js");

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
    res.sendFile("index.html", {root:"public/sentidos/escucha"});
});
// --------------------------------------

//Rutas Sentido Vista
app.get("/vista", (req,res)=>{
    res.sendFile("index.html", {root:"public/sentidos/vista"});
});

// Rutas Sentido Tacto
app.get("/tacto", (req,res)=>{
    res.sendFile("index.html", {root:"public/sentidos/tacto"});
});

// Rutas Sentido Olfato
app.get("/olfato", (req,res)=>{
    res.sendFile("index.html", {root:"public/sentidos/olfato"});
});

app.post("/respuesta", (req,res)=>{
    let body=req.body;
    let question=new Question({
        user_id:body.id,
        sense:body.sense,
        answer:body.answer
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