const express = require("express");
const router = express.Router();
const UserInfo = require("../models/user-schema");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator")
const { userSignupValidation } = require("../config/utility")
//TESTING ROUTE
router.get("/signup", (req, res) => {
    res.send("SIGNUP ROUTE WORKING!!")
})


//POST ROUTE
router.post("/api/signup", userSignupValidation, async (req, res) => {
    const { userid, email, password, confirmpassword } = req.body;

    try {
        //EXPRESS-VALIDATOR
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //USER ALREADY REGISTER
        const isUserExist = await UserInfo.findOne({ email, userid });
        if (isUserExist) {
            return res.status(400).json({
                message: `user already registered`
            })
        }
        //PASSWORD AND CONFIRM PAASWORD NOT MATCHED
        if (password != confirmpassword) {
            return res.status(400).json({
                message: "password/confirmpassword not matched"
            })
        }
        bcrypt.hash(password, 10, async function (err, hash) {
            if (err) {
                return res.status(400).json({
                    message: err.message
                })
            }
            //CREATE NEW USER
            userDetail = await UserInfo.create({
                userid,
                email,
                password: hash
            })
        })
        return res.status(200).json({
            message: "success",
            userDetail
        })
    } //OTHER ERRORS 
    catch (e) {
        return res.status(400).json({
            message: e.message
        })
    }

})


module.exports = router;