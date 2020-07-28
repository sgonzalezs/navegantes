const mongoose=require('mongoose');

let Schema=mongoose.Schema;

let questionSchema=new Schema({
    user:{
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
    value:{
        type:String,
        required:[true, "Debes ingresar una respuesta"]
    },
    activity:{
        type:String,
        required:[true, "Debes ingresar una respuesta"]
    }
});

module.exports=mongoose.model('Quest', questionSchema);