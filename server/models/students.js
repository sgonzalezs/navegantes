const mongoose=require('mongoose');
const uniqueValidator=require("mongoose-unique-validator");

let Schema=mongoose.Schema;

let studentSchema=new Schema({
    type_doc:{
        required:[true, "Debes ingresar el tipo de documento"],
        type:String
    },
    document:{
        type:String,
        required:[true, "Debes ingresar el numero de documento"],
        unique:true
    },
    grade:{
        type:String,
        required:[true, "Debes ingresar el grado"]
    },
    name:{
        type:String,
        required:[true, "Debes ingresar el nombre"]
    },
    school:{
        type:String,
        required:[true, "Debes ingresar el colegio"]
    },
});

studentSchema.plugin(uniqueValidator, {message:'{PATH} debe ser único'});

module.exports=mongoose.model('Student', studentSchema);