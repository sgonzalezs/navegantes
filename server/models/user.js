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
    typeDoc:{
        type:String,
        required:[true, "Debes ingresar el tipo de documento"]
    },
    document:{
        type:String,
        required:[true, "Debes ingresar el numero de documento"],
        unique:true
    },
    number:{
        type:Number,
        required:[true, "Debes ingresar el número"]
    },
    image:{
        type:String,
        default:null
    },
    parentName:{
        type:String,
        required:[true, "debes ingresar el nombre de tu acudiente"]
    },
    parentDoc:{
        type:String,
        required:[true, "Debes ingresar el documento de tu acudiente"]
    },
    date:{
        type:String,
        required:[true, "Debes ingresar la fecha de registro"]
    }
});

userSchema.plugin(uniqueValidator, {message:'{PATH} debe ser único'});

module.exports=mongoose.model('User', userSchema);