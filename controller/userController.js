const Model = require("../models/index");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const salt = 10;
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEY;
const validator = require("../helper/validator");
const helper = require("../helper/commonHelper");
const { Sequelize, Op } = require("sequelize");
const Response = require("../config/response");

Model.userModel.hasMany(Model.orderModel, {
  foreignKey: "userId",
});
Model.orderModel.belongsTo(Model.userModel, {
  foreignKey: "userId",
  as: "userOrder",
});

Model.userModel.hasMany(Model.addressModel, {
  foreignKey: "userId",
});
Model.addressModel.belongsTo(Model.userModel, {
  foreignKey: "userId",
  as: "addresses",
});
module.exports = {
  signUp: async (req, res) => {
    try {
      let schema = Joi.object().keys({
        userName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.number().valid(1, 2).required(),
        phoneNo: Joi.string().required(),
        countryCode: Joi.string().required(),
        foodPrefernces: Joi.number().required(),
      });
      let payload = await validator.validationJoi(req.body, schema);

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

      await helper.nodemailer(objToSave.email);

      return helper.success(res, Response.success_msg.registered, response);
    } catch (error) {
      console.log("failed", error);
      return helper.error(res, Response.error_msg.registeration_err);
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
          return helper.success(res, Response.success_msg.logIn, userexists);
        } else {
          return helper.failed(res, Response.success_msg.logIn, userexists);
        }
      } else {
        return helper.failed(res, Response.failed_msg.noUSer);
      }
    } catch (error) {
      return helper.error(res, Response.error_msg.login_err);
    }
  },
  deleteProductFromCart: async (req, res) => {
    try {
      let remove = await Model.cartModel.destroy({
        where: { id: req.user.subCategoryId },
      });
      return helper.success(res, Response.success_msg.deletetion, remove);
    } catch (error) {
      console.log("error", error);
      return helper.error(res, Response.error_msg.deletion_err);
    }
  },
  suggestions: async (req, res) => {
    try {
      let schema = Joi.object().keys({
        suggestion: Joi.string().required(),
      });
      let payload = await validator.validationJoi(req.body, schema);
      let objToSave = {
        userId: req.user.id,
        suggestion: payload.suggestion,
      };
      let response = await Model.suggestionModel.create(objToSave);
      return helper.success(res, Response.success_msg.suggestion, response);
    } catch (error) {
      console.log("error", error);
      return helper.error(res, Response.error_msg.suggestion_err);
    }
  },
  addAdress: async (req, res) => {
    try {
      let schema = Joi.object().keys({
        houseNo: Joi.string().required(),
        buildingNo: Joi.string().required(),
        landmark: Joi.string().required(),
        recieverName: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        countryCode: Joi.string().required(),
        addressLabelType: Joi.number().required(),
        addressLabel: Joi.string().optional(),
      });
      let payload = await validator.validationJoi(req.body, schema);
      let objToSave = {
        userId: req.user.id,
        houseNo: payload.houseNo,
        buildingNo: payload.buildingNo,
        landmark: payload.landmark,
        recieverName: payload.recieverName,
        phoneNumber: payload.phoneNumber,
        countryCode: payload.countryCode,
        addressLabelType: payload.addressLabelType,
        addressLabel: payload.addressLabel,
      };
      let response = await Model.addressModel.create(objToSave);
      return helper.success(res, Response.success_msg.address, response);
    } catch (error) {
      console.log("error", error);
      return helper.error(res, Response.error_msg.address_err);
    }
  },
  addedAddresses: async (req, res) => {
    try {
      let allAddresses = await Model.userModel.findOne({
        where: { id: req.user.id },
        include: [
          {
            model: Model.addressModel,
            as: "addresses",
          },
        ],
      });
      return helper.success(
        res,
        Response.success_msg.addressHistory,
        allAddresses
      );
    } catch (error) {
      console.log("error", error);
      return helper.error(res, Response.error_msg.addressFetch_err);
    }
  },
  addToCart: async (req, res) => {
    try {
      let schema = Joi.object().keys({
        userId: Joi.string().required(),
        subCategoryId: Joi.string().required(),
        quantity: Joi.string().required(),
      });
      let payload = await validator.validationJoi(req.body, schema);
      let objToSave = {
        userId: payload.userId,
        subCategoryId: payload.subCategoryId,
        quantity: payload.quantity,
      };
      let response = await Model.cartModel.create(objToSave);
      return helper.success(res, Response.success_msg.proAddedToCart, response);
    } catch (error) {
      console.log("err", error);
      return helper.error(res, Response.error_msg.addToCart_err);
    }
  },
  placeOrder: async (req, res) => {
    try {
      let schema = Joi.object().keys({
        cartId: Joi.string().required(),
        orderStatus: Joi.number().required(),
      });
      let payload = await validator.validationJoi(req.body, schema);
      let objToSave = {
        userId: req.user.id,
        cartId: payload.cartId,
        orderStatus: payload.orderStatus,
      };
      let response = await Model.orderModel.create(objToSave);
      return helper.success(res, Response.success_msg.orderPlaced, response);
    } catch (error) {
      console.log("err", error);
      return helper.error(res, Response.error_msg.placeOrder_err);
    }
  },
  orderHistoy: async (req, res) => {
    try {
      let findOrders = await Model.userModel.findOne({
        where: { id: req.user.id },
        include: [
          {
            model: Model.orderModel,
            limit: 1,
            attributes: [
              "userId",
              "amount",
              "orderStatus",
              [
                Sequelize.literal(
                  `(SELECT COUNT(*) FROM orders AS userOrder WHERE userOrder.userId = "${req.user.id}")`
                ),
                "orderCount",
              ],
            ],
          },
        ],
      });
      return helper.success(res, Response.success_msg.order_Histoy, findOrders);
    } catch (error) {
      console.log("err", error);
      return helper.error(res, Response.error_msg.orderHistoy_err);
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
              Sequelize.literal(`6371 * acos(
              cos(radians(${latitude}))
              * cos(radians(latitude))
              * cos(radians(longitude) - radians(${longitude}))
              + sin(radians(${latitude})) * sin(radians(latitude))
            )`),
              "radius",
            ],
          ],
        },
        order: Sequelize.literal("radius ASC"),
      });

      return helper.success(
        res,
        Response.success_msg.nearByProviderFound,
        response
      );
    } catch (error) {
      console.error("Error fetching nearby providers:", error);
      return helper.error(res, Response.error_msg.provider_err);
    }
  },
  forgotPassword: async (req, res) => {
    try {
      let schema = Joi.object().keys({
        email: Joi.string().email().required(),
      });
      let payload = await validator.validationJoi(req.body, schema);
      let userPresent = await Model.userModel.findOne({
        where: { email: payload.email },
      });
      if (!userPresent) {
        return res.send(user_not_found);
      }
      const resetToken = await helper.randomStringGenerate(req, res);
      await userPresent.update({
        resetToken: resetToken,
        resetTokenExpired: new Date(Date.now() + 3600000),
      });
      const resetUrl = `${req.protocol}://${await helper.getHost(
        req,
        res
      )}/users/resetPassword?token=${resetToken}`;
      const transporter = await helper.transporter(payload.email);
      const emailTemplate = await helper.forgetPasswordLinkHTML(
        userPresent,
        resetUrl
      );
      await transporter.sendMail(emailTemplate);
      return helper.success(res, Response.success_msg.linkSent);
    } catch (error) {
      console.log("err", error);
      return helper.error(res, Response.error_msg.forgotPass_err);
    }
  },
  resetPassword: async (req, res) => {
    try {
      let userData = req.user;
      res.render("setNewPassword", { data: userData });
    } catch (error) {
      console.log("err", error);
      return helper.error(res, Response.error_msg.resetPass_err);
    }
  },
  forgotChangePassword: async (req, res) => {
    try {
      let schema = Joi.object().keys({
        id: Joi.string().required(),
        newPassword: Joi.string().required(),
        confirmPassword: Joi.string().required(),
      });
      let payload = await validator.validationJoi(req.body, schema);

      if (payload.newPassword !== payload.confirmPassword) {
        return helper.failed(res, Response.failed_msg.passNotMatched);
      } else {
        let hashpassword = await bcrypt.hash(payload.newPassword, salt);
        let objToSave = {
          newPassword: hashpassword,
          resetToken: null,
          resetTokenExpired: null,
        };
        await Model.userModel.update(objToSave, {
          where: { id: payload.id },
        });
        return res.render("success");
      }
    } catch (error) {
      console.log("err", error);
      return helper.error(res, Response.error_msg.chnagePassword_err);
    }
  },
};
