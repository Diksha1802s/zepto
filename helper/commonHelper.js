const path = require("path");
const fs = require("fs");
const nodemailer=require("nodemailer");
const crypto=require("crypto");
const emailTemplate=require("./emailTemplate/resetPassword")
module.exports = {
  fileUpload: async (file, folder = "uploads") => {
    try {
      if (!file || file.name === "") return null;

      let fileExtension = file.name.split(".").pop();

      const name = uuid() + "." + fileExtension;

      const filePath = path.join(__dirname, "..", "public", folder, name);

      file.mv(filePath, (err) => {
        if (err) throw err;
      });

      return `/images/${name}`;
    } catch (error) {
      console.error("Error during file upload:", error);
      return null;
    }
  },
nodemailer: async (toEmail) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILHOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILERUSER,
        pass: process.env.NODEMAILERPASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MAILBY,
      to: toEmail,
      subject: "Welcome to Our App!",
      text: "Welcome!! You have successfully created your profile.",
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent to:", toEmail);
    return true;
  } catch (error) {
    console.log("Error during sending mail:", error);
    return false;
  }
},
  randomStringGenerate: async (req, res) => {
    try {
      return crypto.randomBytes(32).toString("hex");
    } catch (error) {
      console.log("randomString generate error", error);
      throw error;
    }
  },
    getHost: async (req, res) => {
    const host =
      req.headers.host || `${req.hostname}:${req.connection.localPort}`;
    return host;
  },
   forgetPasswordLinkHTML: async (user, resetUrl) => {
    try {
      let mailOptions = {
        from: process.env.MAILBY,
        to: user.email,
        subject: "Password Reset Request",
        html: emailTemplate.forgotPassword(resetUrl),
      };
      return mailOptions;
    } catch (error) {
      console.log("forgetPassword error", error);
      throw error;
    }
  },
};
