const jwt = require("jsonwebtoken");
const secretKey =process.env.SECRETKEY;
const Model = require("../models/index");

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
};
