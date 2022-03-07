const jwt = require("jsonwebtoken");
const Admin=require('../Models/Admin');
const User=require('../Models/User');

module.exports = {
  user: async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ msg: "user not logged in" });
      }
      const obj = jwt.verify(token, "secret");
      console.log(obj)
      const user = await User.findOne({ _id: obj.id });
      if (!user) {
        return res.status(401).json({ msg: "user not found" });
      }
      req.userId = obj.id;
      next();
    } catch (err) {
      console.log(err)
      res.status(500).json({ msg: "token validation err" });
    }
  },
  admin: async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ msg: "admin not logged in" });
        }
        const obj = jwt.verify(token, "secret");
        const user=await Admin.findOne({id:obj.id});
        console.log(user)
        if(!user){
            return res.status(401).json({ msg: "admin not logged in" });
        }
        req.adminId = obj.id;
        next();
    } catch (err) {
      console.log(err)
      res.status(500).json({ msg: "token validation err" });
    }
  },
};
