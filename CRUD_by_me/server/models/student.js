const mongoose=require('mongoose')

const studentSchema=new mongoose.Schema({
    name: String,
    email: String,
    age: String
})

const studentModel=mongoose.model('collection',studentSchema)
module.exports=studentModel