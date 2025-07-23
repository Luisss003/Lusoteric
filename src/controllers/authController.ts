const User = require('./../models/userModel');
const asyncErrorHandler = require('./../utils/asyncErrorHandler');
const jwt = require('jsonwebtoken');

exports.signup = asyncErrorHandler(async(req, res, next) => {
    const newUser = await User.create(req.body);
    
    const token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60),
                                id: newUser.id},
                                process.env.JWT_SECRET_KEY);

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            newUser
        }
    });   
});

exports.signin = asyncErrorHandler(async(req, res, next) => {

});