const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../Models/Admin");
const User = require("../Models/User");
module.exports = {
  loginUser: async (req, res) => {
    try {
      const {id,password}=req.body;
      
      // if user does not exist
      const user=await User.findOne({id:id});
      if(!user){
        res.status(400).json({msg:"user does not exist"})
      }
      // if user exists
      const matchPassword=await bcrypt.compare(password,user.password);
      if(!matchPassword){
        res.status(400).json({msg:"password is incorrect"})
      }
      // if password is correct
      const token=jwt.sign({id:user._id},"secret",{expiresIn:"1h"});
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      });  
      console.log(user)
      res.status(200).json({user});
    } catch (err) {
      console.log(err);
      res.status(500).json({msg:"server error"});
    }
  },
  loginAdmin:async (req,res)=>{
    try {
      const {id}=req.body;
      console.log(id)
      const admin=await Admin.findOne({id:id});
      if(!admin){
        return res.status(400).json({msg:"admin does not exist"})
      }
      const token=jwt.sign({id:admin.id},"secret",{expiresIn:"1h"});
      res.cookie("token", token, {maxAge: 1000 * 60 * 60});
      res.status(200).json({admin});
    } catch (err) {
      console.log(err);
      res.status(500).json({msg:"server error"});
    }
  },
  registerAdmin: async (req, res) => {
    try {
      const admin=await Admin.findOne({id:req.body.id})
      if(admin){
        return res.status(400).json({msg:"Admin already exists"})
      }
      const newadmin = new Admin({
        name: req.body.name,
        id: req.body.id,
      });
      await newadmin.save();
      res.status(200).json({ msg: "admin created" });
    } catch (err) {
      console.log(err);
      res.status(500).json({});
    }
  },
  registerUser: async (req, res) => {
    try {
      const { id, name, password } = req.body;

      const user = await User.findOne({ id });
      if (user) {
        return res.status(400).json({ msg: "user already present" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        id,
        name,
        password: hashedPassword,
      })
      await newUser.save();
      res.status(200).json({ msg: "user created" });
    } catch (err) {
      console.log(err);
      res.status(500).json({msg:"some error occurred"});
    }
  },
  logout: async (req, res) => {
    try{
      res.clearCookie("token");
      res.status(200).json({msg:"logged out"});
    }catch(err){
      console.log(err);
      res.status(500).json({});
    }
  }
};

// error utility, to be used in all the routes
