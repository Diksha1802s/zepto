const Model = require("../models/index");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const salt = 10;
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEY;
const validator = require("../helper/validator");
const helper = require("../helper/commonHelper");
const{Sequelize,Op}=require("sequelize");

module.exports = {
  signUp: async (req, res) => {
    try {
      console.log(req.body);

      let schema = Joi.object().keys({
        userName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.number().required(),
        phoneNo: Joi.string().required(),
        countryCode: Joi.string().required(),
        foodPrefernces: Joi.number().required(),
      });
      let payload = await validator.validationJoi(req.body, schema);
      console.log(payload);

      let hashpassword = await bcrypt.hash(payload.password, salt);

      let objToSave = {
        userName: payload.userName,
        email: payload.email,
        password: hashpassword,
        role: payload.role,
        phoneNo: payload.phoneNo,
        countryCode: payload.countryCode,
        foodPrefernces: payload.foodPrefernces,
      };
      let response = await Model.userModel.create(objToSave);
      console.log(response);
      return res.send(response);
    } catch (error) {
      console.log("failed", error);
      return res.send(error);
    }
  },
  logIn: async (req, res) => {
    try {
      let schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      });
      let payload = await validator.validationJoi(req.body, schema);

      let userexists = await Model.userModel.findOne({
        where: { email: payload.email },
        raw: true,
      });
      console.log(userexists);

      if (userexists) {
        let verify = await bcrypt.compare(
          payload.password,
          userexists.password
        );
        if (verify) {
          let token = jwt.sign(
            {
              email: userexists.email,
            },
            secretKey
          );
          userexists.token = token;
          console.log(userexists);
          return res.send(userexists);
        } else {
          return res.send("Invalid password");
        }
      } else {
        return res.send("user doesnt exist");
      }

      return res.send(userexists);
    } catch (error) {
      console.log("failed", error);
    }
  },
  addProductInCart:async(req,res)=>{
    try {
      let schema=Joi.object().keys({
        userId:Joi.string().required(),
        subCategoryId:Joi.string().optional(),
        quantity:Joi.number().required()
      })
      let payload= await validator.validationJoi(req.body,schema);
      let objToSave={
        userId:payload.userId,
        subCategoryId:payload.subCategoryId,
        quantity:payload.quantity,
      }
      let response = await Model.cartModel.create(objToSave);
      console.log(response);
      return res.send(response);
    } catch (error) {
      console.log("error", error);
      return res.send(error);
    }
  },
  deleteProductFromCart: async (req, res) => {
    try {
      let remove = await Model.cartModel.destroy({
        where: { id: req.user.subCategoryId },
      });
      return res.send(remove);
    } catch (error) {
      console.log("error", error);
      return res.send(error);
    }
  },
  suggestions:async(req,res)=>{
    try {
      let schema=Joi.object().keys({
       suggestion:Joi.string().required()
      })
      let payload= await validator.validationJoi(req.body,schema);
      let objToSave={
        userId:req.user.id,
        suggestion:payload.suggestion,
      }
      let response=await Model.suggestionModel.create(objToSave)
      console.log("res",response)
      return res.send(response)
    } catch (error) {
      console.log("error", error);
      return res.send(error);
    }
  }, 
  addAdress:async(req,res)=>{
    try {
      let schema=Joi.object().keys({
       houseNo:Joi.string().required(),
       buildingNo:Joi.string().required(),
       landmark:Joi.string().required(),
       recieverName:Joi.string().required(),
       phoneNumber:Joi.string().required(),
       countryCode:Joi.string().required(),
       addressLabelType:Joi.number().required(),
       addressLabel:Joi.string().optional(),
      })
      let payload=await validator.validationJoi(req.body,schema);
      let objToSave={
        userId:req.user.id,
        houseNo:payload.houseNo,
        buildingNo:payload.buildingNo,
        landmark:payload.landmark,
        recieverName:payload.recieverName,
        phoneNumber:payload.phoneNumber,
        countryCode:payload.countryCode,
        addressLabelType:payload.addressLabelType,
        addressLabel:payload.addressLabel,
      }
      let response=await Model.addressModel.create(objToSave);
      console.log("res",response)
      return res.send(response)
    } catch (error) {
      console.log("error", error);
      return res.send(error);
    }
  },
  addedAddresses:async(req,res)=>{
    try {
      console.log(req.user)
      let allAddresses= await Model.addressModel.findAll({
        where:{userId:req.user.id},
      })
      console.log("add",allAddresses)
      return res.send(allAddresses)
    } catch (error) {
      console.log("error", error);
      return res.send(error);
    }
  },
  addToCart:async(req,res)=>{
    try {
      let schema=Joi.object().keys({
        userId:Joi.string().required(),
        subCategoryId:Joi.string().required(),
        quantity:Joi.string().required()
      })
      let payload= await validator.validationJoi(req.body,schema)
      let objToSave={
        userId:payload.userId,
        subCategoryId:payload.subCategoryId,
        quantity:payload.quantity,
      }
      let response=await Model.cartModel.create(objToSave)
      console.log("res",response)
      return res.send(response)
    } catch (error) {
      console.log("err",error)
      return res.send(error)
    }
  },
  placeOrder:async(req,res)=>{
    try {

    let schema=Joi.object().keys({
      cartId:Joi.string().required(),
      orderStatus:Joi.number().required()
    })
    let payload=await validator.validationJoi(req.body,schema)
    let objToSave={
      userId:req.user.id,
      cartId:payload.cartId,
      orderStatus:payload.orderStatus
    }
    console.log("res",objToSave)
    let response=await Model.orderModel.create(objToSave)
    console.log("res",response)
    return res.send(response)
    
  }
     catch (error) {
      console.log("err",error)
      return res.send(error)
    }
 
},
orderHistoy:async(req,res)=>{
  try {
    
    let findOrders=await Model.orderModel.findAll({
      where:{userId:req.user.id},
      raw:true
    })
    console.log("res",findOrders)
    return res.send(findOrders)
  } catch (error) {
      console.log("err",error)
      return res.send(error)
  }
},
nearByProvider: async (req, res) => {
  try {
    const { latitude, longitude } = req.user;

    const provider = await Model.userModel.findAll({
      where: {
        role: 2,
        latitude: { [Op.ne]: null },
        longitude: { [Op.ne]: null },
      },
      attributes: {
        include: [
          [
          `(6371 * acos(cos(radians(${req.user.latitude}))
      * cos(radians(CAST(MIN(latitude) AS DECIMAL(10,6))))
      * cos(radians(CAST(MIN(longitude) AS DECIMAL(10,6))) - radians(${req.user.longitude}))
      + sin(radians(${req.user.latitude})) * sin(radians(CAST(MIN(latitude) AS DECIMAL(10,6))))))`;
    
 
          ],
        ],
      },
    });

    if (provider.length === 0) {
      return res.status(404).send("No providers found nearby");
    }

    return res.status(200).send(provider);
  } catch (error) {
    console.error("Error fetching nearby providers:", error);
    return res.status(500).send("Server error");
  }
}


};