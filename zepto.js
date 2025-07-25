require("dotenv").config();
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const port = 3001;
const path = require("path");
require("./dbconnection").connection();
require("./models/index");

const router = require("./router/userRouter");
const adminRouter = require("./router/adminRouter");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());

app.use("/users", router);
app.use("/admin", adminRouter);

app.listen(port, () => {
  console.log(`server on port ${port}`);
});
