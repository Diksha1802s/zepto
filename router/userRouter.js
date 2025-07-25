const express=require('express')
const router=express.Router()
const {authentication, forgotPasswordVerify }=require("../middleware/authentication")

const controller=require("../controller/index")

router.post("/signUp",controller.userController.signUp)
router.post("/logIn",controller.userController.logIn)
router.delete("/deleteProductFromCart",authentication,controller.userController.deleteProductFromCart)
router.post("/suggestions",authentication,controller.userController.suggestions)
router.post("/addAdress",authentication,controller.userController.addAdress)
router.get("/addedAddresses",authentication,controller.userController.addedAddresses)
router.post("/addSubCategories",controller.providerController.addSubCategories)
router.post("/addToCart",controller.userController.addToCart)
router.post("/placeOrder",authentication,controller.userController.placeOrder)
router.get("/orderHistoy",authentication,controller.userController.orderHistoy)
router.get("/nearByProvider",authentication,controller.userController.nearByProvider)
router.post("/forgotPassword",controller.userController.forgotPassword)
router.get("/resetPassword",forgotPasswordVerify, controller.userController.resetPassword)
router.post("/forgotChangePassword", controller.userController.forgotChangePassword)

module.exports=router;