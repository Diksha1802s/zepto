const jwt = require("jsonwebtoken");
const secretKey =process.env.SECRETKEY;
const Model = require("../models/index");
const {Sequelize}=require("sequelize")
const Response=require("../config/response")
module.exports = {
  authentication: async (req, res, next) => {
    try {
      let token = req.headers && req.headers.authorization;
      
      if (!token) {
        return res.send("token required");
      }
      let newToken = token.startsWith("Bearer") ? token.split(" ")[1] : token;
      let decode = jwt.decode(newToken, secretKey);

      if (decode) {
        let response = await Model.userModel.findOne({
          where: { email: decode.email },
          raw: true,
        });
        req.user = response;
        next();
      } else {
        return res.send("invalid Token");
      }
    } catch (error) {
      return res.send("something went wrong",error);
    }
  },

    forgotPasswordVerify: async (req, res, next) => {
    try {
      const { token } = req.query;

      const user = await Model.userModel.findOne({
        where: {
          resetToken: token,
          resetTokenExpired: { [Sequelize.Op.gt]: new Date() },
        },
        raw: true,
      });
 
      if (!user) {
        return res.render("linkExpired");
      }
 
      req.user = user;
      next();
    } catch (error) {
      console.error("Forgot password token verification error:", error);
    }
  },
 
};
