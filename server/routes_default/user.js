const express=require('express');
const User=require("../models/user.js");
const Student=require("../models/students.js");
const Quest=require("../models/questions.js");
const Inspiring=require("../models/inspiring.js");
const path=require("path");

//token config
const jwt=require("jsonwebtoken");
const { verifyToken } = require('../middlewares/auth.js');

const app=express();

app.get("/inspiracioncomfama", (req,res)=>{
    res.sendFile("index.html", {root: 'public/'});
});


app.get("/inspiracioncomfama/avatar", (req,res)=>{
    res.sendFile("avatar.html", {root: 'public/'});
});

app.get("/inspiracioncomfama/sentido", (req,res)=>{
    res.sendFile("sentidos.html", {root: 'public/'});
});

// Rutas Sentido Escucha
app.get("/inspiracioncomfama/escucha", (req,res)=>{
    res.sendFile("musica.html", {root:"public/sentidos/escucha"});
});
app.get("/inspiracioncomfama/escucha-reflexion", (req,res)=>{
    res.sendFile("index.html", {root:"public/sentidos/escucha"});
});

app.get("/inspiracioncomfama/escucha-recompensas", (req,res)=>{
    res.sendFile("recompensas.html", {root:"public/sentidos/escucha"});
});

// ----------------------------------------

//Rutas Sentido Vista
app.get("/inspiracioncomfama/vista", (req,res)=>{
    res.sendFile("vista.html", {root:"public/sentidos/vista"});
});

app.get("/inspiracioncomfama/vista-reflexion", (req,res)=>{
    res.sendFile("index.html", {root:"public/sentidos/vista"});
});

app.get("/inspiracioncomfama/vista-recompensas", (req,res)=>{
    res.sendFile("recompensas.html", {root:"public/sentidos/vista"});
});
// ----------------------------------------

// Rutas Sentido Tacto
app.get("/inspiracioncomfama/tacto", (req,res)=>{
    res.sendFile("tacto.html", {root:"public/sentidos/tacto"});
});

app.get("/inspiracioncomfama/tacto-reflexion", (req,res)=>{
    res.sendFile("index.html", {root:"public/sentidos/tacto"});
});

app.get("/inspiracioncomfama/tacto-recompensas", (req,res)=>{
    res.sendFile("recompensas.html", {root:"public/sentidos/tacto"});
});
// -------------------------------------------

// Rutas Sentido Olfato
app.get("/inspiracioncomfama/olfato", (req,res)=>{
    res.sendFile("olfato.html", {root:"public/sentidos/olfato"});
});

app.get("/inspiracioncomfama/olfato-reflexion", (req,res)=>{
    res.sendFile("index.html", {root:"public/sentidos/olfato"});
});

app.get("/inspiracioncomfama/olfato-recompensas", (req,res)=>{
    res.sendFile("recompensas.html", {root:"public/sentidos/olfato"});
});
// --------------------------------------------------

// Ruras Sentido Gusto
app.get("/inspiracioncomfama/gusto", (req,res)=>{
    res.sendFile("gusto.html", {root:"public/sentidos/gusto"});
});

app.get("/inspiracioncomfama/gusto-reflexion", (req,res)=>{
    res.sendFile("index.html", {root:"public/sentidos/gusto"});
});

app.get("/inspiracioncomfama/gusto-recompensas", (req,res)=>{
    res.sendFile("recompensas.html", {root:"public/sentidos/gusto"});
});

// Sentidos
app.get("/inspiracioncomfama/sentidos-reflexion", (req,res)=>{
    res.sendFile("reflexion.html", {root:"public/"});
});

// Inspiracion
app.get("/inspiracioncomfama/inspiraciones", (req,res)=>{
    res.sendFile("inspiracion.html", {root:"public"});
});

app.get("/inspiracioncomfama/catalina-arroyave", (req,res)=>{
    res.sendFile("catalina.html", {root:"public/inspiracion"});
});

app.get("/inspiracioncomfama/maria-camila-trillos", (req,res)=>{
    res.sendFile("mcamila.html", {root:"public/inspiracion"});
});

app.get("/inspiracioncomfama/boyka", (req,res)=>{
    res.sendFile("boyka.html", {root:"public/inspiracion"});
});

app.get("/inspiracioncomfama/juan-pablo-valencia", (req,res)=>{
    res.sendFile("jpablo.html", {root:"public/inspiracion"});
});

app.get("/inspiracioncomfama/jke", (req,res)=>{
    res.sendFile("jke.html", {root:"public/inspiracion"});
});

app.get("/inspiracioncomfama/brigitte-baptiste", (req,res)=>{
    res.sendFile("brigette.html", {root:"public/inspiracion"});
});

app.get("/inspiracioncomfama/arex", (req,res)=>{
    res.sendFile("arex.html", {root:"public/inspiracion"});
});

app.get("/inspiracioncomfama/melissa-toro", (req,res)=>{
    res.sendFile("mtoro.html", {root:"public/inspiracion"});
});

app.get("/inspiracioncomfama/inspiracion-reflexion", (req,res)=>{
    res.sendFile("reflexion.html", {root:"public/inspiracion"});
});

app.get("/inspiracioncomfama/inspiracion-recompensas", (req,res)=>{
    res.sendFile("recompensas.html", {root:"public/inspiracion"});
});

// Recorridos
app.get("/inspiracioncomfama/recorrido", (req,res)=>{
    res.sendFile("recorridos.html", {root:"public/recorridos"});
});

app.get("/inspiracioncomfama/encuentro", (req,res)=>{
    res.sendFile("centro.html", {root:"public/recorridos"});
});

app.get("/inspiracioncomfama/conocimiento", (req,res)=>{
    res.sendFile("conocimiento.html", {root:"public/recorridos"});
});

app.get("/inspiracioncomfama/apropiacion", (req,res)=>{
    res.sendFile("apropiacion.html", {root:"public/recorridos"});
});

app.get("/inspiracioncomfama/recorridos-reflexion", (req,res)=>{
    res.sendFile("reflexion.html", {root:"public/recorridos"});
});

app.get("/inspiracioncomfama/recorridos-recompensas", (req,res)=>{
    res.sendFile("recompensas.html", {root:"public/recorridos"});
});

// CIERRE
app.get("/inspiracioncomfama/premiacion", (req,res)=>{
    res.sendFile("cierre.html", {root:"public/"});
});

app.get("/inspiracioncomfama/viaje", (req,res)=>{
    res.sendFile("mapa.html", {root:"public/"});
});

app.get("/senses/:user&:answer&:question", (req,res)=>{
    let user=req.params.user;
    let answer=req.params.answer;
    let question=req.params.question;

    Quest.findOne({user, question, value:answer}, (err, dataFound)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message: err
            });
        }

        if(!dataFound){
            return res.status(404).json({
                ok:false,
                message:"not found"
            });
        }

        return res.status(200).json({
            ok:true,
            message:"complete"
        }); 
    });
});

app.get("/datos/:sense&:activity", (req,res)=>{
    let sense=req.params.sense;
    let activity=req.params.activity;
    Quest.find({sense, activity}, (err, data)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message: err
            });
        }
        if(!data){
            return res.status(400).json({
                ok:false,
                message:"not found"
            });
        }
        return res.status(200).json({
            ok:true,
            data
        });
    });
});

app.get("/student/:user", (req,res)=>{
    let user=req.params.user;

    Student.findOne({document:user}, (err, data)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message: err
            });
        }
        return res.status(200).json({
            ok:true,
            data
        });
    })
})

app.post("/respuesta", (req,res)=>{
    let body=req.body;
    let question=new Quest({
        user:body.id,
        question:body.question,
        sense:body.sense,
        value:body.answer,
        activity:body.activity
    });

    Quest.findOne({user:body.id, question:body.question, sense:body.sense}, (err, ansFound)=>{
        if(err){
			return res.status(400).json({
				ok:false,
				message:err
			});
        }
        if(ansFound){
            return res.status(400).json({
                ok:false,
                message:"exists",
                data:ansFound
            });
        }
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
});

app.post("/inspiracioncomfama/login", (req,res)=>{
    let body=req.body;

    if(body.document=="00000000" && body.email=="admin@admin.admin"){
        return res.status(200).json({
            ok:true,
            message:"admin login"
        });
    }

    Student.findOne({document:body.document}, (failed, studentData)=>{
        if(failed){
            return res.status(400).json({
                ok:false,
                message:failed
            });
        }
        if(!studentData){
            return res.status(404).json({
                ok:false,
                message:"student not found"
            });
        }

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
                    token,
                    student:studentData
                });
            }else{
                return res.status(404).json({
                    ok:false,
                    message:"not found"
                });
            }
        });
    });
});

app.post("/registro", (req,res)=>{
    let body=req.body;

    Student.findOne({document:body.document}, (failed, studentData)=>{
        if(failed){
            return res.status(400).json({
                ok:false,
                message:failed
            });
        }
        if(!studentData){
            return res.status(404).json({
                ok:false,
                message:"student not found"
            });
        }

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
                    token,
                    student: studentData
                });
            }else{
                let user=new User({
                    name:body.name,
                    email:body.email,
                    typeDoc:body.type_doc,
                    document:body.document,
                    number:body.number,
                    parentName:body.parent_name,
                    parentDoc:body.parent_doc
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
                        token,
                        student: studentData
                    });
                });
            }
        });
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