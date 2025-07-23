const Model = require("../models/index");
const Joi = require("joi");
const validator = require("../helper/validator");

module.exports={
    addCategory:async(req,res)=>{
        try {
            console.log(req.body)
            let schema=Joi.object().keys({
               title:Joi.string().required() 
            })
            let payload= await validator.validationJoi(req.body,schema)
            console.log("pay",payload)
            let objToSave={
                title:payload.title
            }
            console.log(objToSave)
            let response=await Model.categoryModel.create(objToSave)
            return res.send(response)
        } catch (error) {
           console.log("error",error) 
           return res.send(error)
        }
    }
}