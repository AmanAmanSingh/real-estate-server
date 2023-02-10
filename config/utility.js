const { body } = require("express-validator");

exports.userSignupValidation = [
    body("userid").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/),
    body("email").isEmail(),
    body("password").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)
];
