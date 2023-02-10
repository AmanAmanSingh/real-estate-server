const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");
const dotenv = require("dotenv").config();
const connection = require("../config/connection")();
const fileUpload = require("express-fileupload");

//ALL ROUTES CONTROLLER
const userRouter = require("../routes/user");
const loginRouter = require("../routes/login")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload())


//TESTING ROUTE
app.get("/", (req, res) => {
    res.send("APP ROUTE WORKING !")
})

app.use("/", userRouter)
app.use("/", loginRouter)
app.listen(PORT, () => { console.log(`server started at port ${PORT}`) })