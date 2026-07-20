const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
    try {
        const newUser = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            passwordConfirm:req.body.passwordConfirm         
        });
        const token = jwt.sign({ id: newUser._id },
            process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        return res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
        });
    } catch (err) {
        next(err);
    }
};

// exports.login = (req,res,next)=>{
//     const { email } = req.body;
//     const { password } = req.body;

//     // check if email and password exists

//     if(!email || !password)
        

//     // check if password is correct and user exists

//     //if everything is ok send web token back to the client



// }