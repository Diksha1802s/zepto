const Model = require("../models/index");
const Joi = require("joi");
const validator = require("../helper/validator");

module.exports = {
  addSubCategories: async (req, res) => {
    try {
      let schema = Joi.object().keys({
        categoryId:Joi.string().required(),
        itemName: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
        information: Joi.string().required(),
      });
      let payload = await validator.validationJoi(req.body, schema);
      let objToSave = {
        categoryId:payload.categoryId,
        itemName: payload.itemName,
        price: payload.price,
        quantity: payload.quantity,
        information: payload.information,
      };
      let response = await Model.subCategoryModel.create(objToSave);
      return res.send(response);
    } catch (error) {
      console.log("error", error);
    }
  },
};
