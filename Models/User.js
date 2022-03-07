const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    // history:{
    //     type:Array,
        
    // }
})
module.exports=mongoose.model('User',UserSchema)