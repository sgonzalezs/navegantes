const mongoose=require('mongoose');

let Schema=mongoose.Schema;

let inspiringSchema=new Schema({
    name:{
        required:true,
        type:String
    },
    like:{
        type:Number,
    },
    dislike:{
        type:Number,
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

module.exports=mongoose.model('Inspiring', inspiringSchema);