const mongoose=require('mongoose')

const adminSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    id:{
        type:String,
    },
})
module.exports=mongoose.model('Admin',adminSchema)