require("dotenv").config()
const express = require('express');
const app = express();
const fileUpload = require("express-fileupload");
const port = 3001;

require("./dbconnection").connection();
require("./models/index")

const router = require("./router/userRouter");
const adminRouter=require("./router/adminRouter")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/user", router);
app.use("/admin",adminRouter)

app.listen(port, () => {
  console.log(`server on port ${port}`);
});
