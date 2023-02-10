const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const UserInfo = require("../models/user-schema")
const jwt = require("jsonwebtoken");

//TESTING ROUTE
router.get("/login", (req, res) => {
    return res.send("LOGIN ROUTE IS WORKING!!")
})

//LOGIN HERE
router.post("/api/login", async (req, res) => {
    const { userid, password } = req.body;
    try {
        //USER NOT EXIST
        const userData = await UserInfo.findOne({ userid });
        if (!userData) {
            return res.status(400).json({
                message: "Please signup First"
            })
        }
        //COMPARE HASHED PASSWORD
        bcrypt.compare(password, userData.password, async function (err, result) {
            if (err) {
                return res.status(400).json({
                    message: err.message
                })
            }
            if (result) {
                //GENRATE  JWT TOKEN
                const Token = await jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
                    data: userData
                }, process.env.SECRET_KEY);

                return res.status(200).json({
                    message: "successfully login",
                    userData,
                    Token
                })
            }//INCORRECT PASSWORD
            else {
                return res.status(400).json({
                    message: "incorrect password"
                })
            }
        })
    } catch (e) {
        return res.status(500).json({
            message: e.message
        })
    }
})

module.exports = router