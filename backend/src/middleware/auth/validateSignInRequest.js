const {check}=require("express-validator");

exports.validateSignInRequest=[
    check("email")
    .isEmail()
    .withMessage("enter valid email"),
    check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({min:6})
    .withMessage("password must be minimum 6 characters")
];