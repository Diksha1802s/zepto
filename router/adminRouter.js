const express=require('express')
const router=express.Router()
const authorization=require("../middleware/authentication").authentication

const controller=require("../controller/index")

router.post("/addCategory",controller.adminController.addCategory)

module.exports=router