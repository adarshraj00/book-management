const express=require('express')
const mongoose=require('mongoose')
const cookieParser = require("cookie-parser");
const cors=require('cors')
require("dotenv").config();
const Admin=require('./Models/Admin')
const User=require('./Models/User')
mongoose.connect(
  "mongodb+srv://adarsh-admin:AoUJo2luTwjrCDHv@cluster0.jjs5s.mongodb.net/kroop"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongodb Connection Error:"));

db.once("open", () => {
  console.log("Mongodb Connection Successful");
});
const app=express()
app.use(express.json())
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use('/api/auth',require('./routes/auth'))
app.use('/api/books',require('./routes/books'))
app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(8080,()=>{
    console.log('server is running on port 8080')
})