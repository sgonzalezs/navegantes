//Requires
const express=require("express");

// Models
const User=require('../models/user.js');
const Student=require("../models/students.js");
const Quest=require("../models/questions.js");

const app=express();

app.get("/inspiracioncomfama/administracion", (req,res)=>{
    res.sendFile("admin.html", {root:"public"});
});

app.get("/school/:doc", (req,res)=>{
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

app.get("/students", (req,res)=>{
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

app.get("/usuarios", (req,res)=>{
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

app.get("/quest", (req,res)=>{
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

app.get("/usuario/:user", (req,res)=>{
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

app.post("/student", (req,res)=>{
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

app.get("/student/:doc", (req,res)=>{
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

module.exports=app;