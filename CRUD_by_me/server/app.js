const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const authRoute=require('./routes/authRoute')
const app=express()

app.use(cors())

app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/CRUD__MERN').then(()=>{
    console.log('MongoDB connected Successfully')
}).catch((error)=>{
    console.log('MongoDB connection Failed',error)
})


app.use('/api',authRoute)

app.listen(4000,()=>{
    console.log('Server running on Port : 4000')
})