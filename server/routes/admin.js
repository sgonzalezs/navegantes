//Requires
const express=require("express");
const fileUpload=require('express-fileupload');
// Models
const User=require('../models/user.js');
const Student=require("../models/students.js");
const Quest=require("../models/questions.js");

const app=express();
app.use(fileUpload());

app.get("/inspiracioncomfama/administracion", (req,res)=>{
    res.sendFile("admin.html", {root:"public"});
});

app.get("/inspiracioncomfama/administracion-registro", (req,res)=>{
    res.sendFile("admin-reg.html", {root:"public"});
});

app.get("/inspiracioncomfama/school/:doc", (req,res)=>{
    let doc=req.params.doc;
    Student.findOne({document:doc},(errno, dataJoin)=>{
        if(errno){
            return res.status(400).json({
                ok:false,
                message:errno
            });
        }
        return res.status(200).json({
            ok:true,
            name:dataJoin.name,
            school:dataJoin.school
        });
    });
})

app.get("/inspiracioncomfama/students", (req,res)=>{
    // let doc=req.params.doc;
    Student.find((errno, data)=>{
        if(errno){
            return res.status(400).json({
                ok:false,
                message:errno
            });
        }
        return res.status(200).json({
            ok:true,
            data
        });
    });
});

app.get("/inspiracioncomfama/usuarios", (req,res)=>{
    User.find((err, data)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:err
            });
        }
        return res.status(200).json({
            ok:true,
            data
        });
    });
});

app.get("/inspiracioncomfama/quest", (req,res)=>{
    Quest.find((err, data)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:err
            });
        }

        return res.status(200).json({
            ok:true,
            data
        });
    });
});

app.get("/inspiracioncomfama/usuario/:user", (req,res)=>{
    let user=req.params.user;

    Quest.find({user}, (err, data)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:err
            });
        }

        if(!data){
            return res.status(404).json({
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

app.post("/inspiracioncomfama/student", (req,res)=>{
    let body=req.body;

    let student=new Student({
        type_doc:body.type_doc,
        document:body.document,
        grade:body.grade,
        name:body.name,
        school:body.school
    });

    student.save((err,newData)=>{
        if(err){
            return res.status(401).json({
                ok:false,
                message:err
            });
        }

        return res.status(200).json({
            ok:true,
            data:newData
        });
    });
});

app.get("/inspiracioncomfama/student/:doc", (req,res)=>{
    let document=req.params.doc;

    Student.findOne({document}, (err, data)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:err
            });
        }

        return res.status(200).json({
            ok:true,
            data
        });
    });
});

app.post('/inspiracioncomfama/upload', function(req, res) {
    // console.log(req.files.fileInput);
    let file=req.files.fileInput;
    let name=file.name;
    file.mv('public/files/'+name, function(err) {
        if (err){
            return res.status(500).json({
                ok:false,
                message: err
            });
        }
        return res.redirect("/inspiracioncomfama/administracion-registro");
    });
});

module.exports=app;