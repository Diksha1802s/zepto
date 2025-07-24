const express=require('express')
const router=express.Router()
const authorization=require("../middleware/authentication").authentication

const controller=require("../controller/index")

router.post("/signUp",controller.userController.signUp)
router.post("/logIn",controller.userController.logIn)
router.delete("/deleteProductFromCart",authorization,controller.userController.deleteProductFromCart)
router.post("/suggestions",authorization,controller.userController.suggestions)
router.post("/addAdress",authorization,controller.userController.addAdress)
router.get("/addedAddresses",authorization,controller.userController.addedAddresses)
router.post("/addSubCategories",controller.providerController.addSubCategories)
router.post("/addToCart",controller.userController.addToCart)
router.post("/placeOrder",authorization,controller.userController.placeOrder)
router.get("/orderHistoy",authorization,controller.userController.orderHistoy)
router.get("/nearByProvider",authorization,controller.userController.nearByProvider)
module.exports=router;