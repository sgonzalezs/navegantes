const mongoose=require('mongoose');

let Schema=mongoose.Schema;

let inspiringSchema=new Schema({
    name:{
        required:true,
        type:String
    },
    category:{
        type:String,
        require:true
    }
});

module.exports=mongoose.model('Inspiring', inspiringSchema);