const router=require('express').Router();
const authController=require('../controllers/auth')
const verifyToken=require('../middleware/verifyToken')
//can only be done by admin
router.post('/register-user',verifyToken.admin,authController.registerUser) // only admin can register user
router.post('/register-admin',authController.registerAdmin) 

router.post('/login-admin',authController.loginAdmin)
router.post('/login-user',authController.loginUser)


router.post('/logout',authController.logout)

module.exports=router;