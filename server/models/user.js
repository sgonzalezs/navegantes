const mongoose=require('mongoose');
const uniqueValidator=require("mongoose-unique-validator");

let Schema=mongoose.Schema;

let userSchema=new Schema({
    name:{
        required:[true, "Debes ingresar el nombre"],
        type:String
    },
    email:{
        type:String,
        required:[true, "Debes ingresar el correo"],
        unique:true
    },
    age:{
        type:Number,
        required:[true, "Debes ingresar tu edad"]
    },
    image:{
        type:String,
        default:null
    }
});

userSchema.plugin(uniqueValidator, {message:'{PATH} debe ser único'});

module.exports=mongoose.model('User', userSchema);