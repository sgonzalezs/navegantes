const mongoose=require('mongoose');
const uniqueValidator=require("mongoose-unique-validator");

let Schema=mongoose.Schema;

let questionSchema=new Schema({
    user_id:{
        required:true,
        type:String
    },
    question:{
        type:String,
        required:[true, 'Debes ingresar la pregunta']
    },
    sense:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:[true, "Debes ingresar una respuesta"]
    },
    activity:{
        type:String,
        required:[true, "Debes ingresar una respuesta"]
    }
});

questionSchema.plugin(uniqueValidator, {message:'{PATH} debe ser único'});

module.exports=mongoose.model('Question', questionSchema);