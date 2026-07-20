const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
//name email passwords passwordconfirm image

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,'Please provide a Name']
    },
    email:{
        type:String,
        required:[true,'Please provide a email'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Enter a valid email']

    },
    image:{
        type:String,
    },
    password:{
        type:String,
        required:[true,'User must have password'],
        minlength:8
    },
    passwordConfirm:{
        type:String,
        required:[true,' Please Confirm password'],
        validate:{
            validator:function(el)
            {
                return el ===this.password;
            },message:'passwords are not the same'
        }
    }
});

userSchema.pre('save',async function(next){
    //only runs if password is modified
    if(!this.isModified('password'))return next();
    this.password = await bcrypt.hash(this.password,10);
    this.passwordConfirm=undefined;
    next();

});

const User = mongoose.model('User',userSchema);

module.exports= User;