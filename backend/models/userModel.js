const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')


const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//statics methods for signup

userSchema.statics.signup = async function(email, password){

    //server side validation of email and password

    if(!email || !password){
        console.log(email, password)
        throw new Error("All fields must be filled")
    }

    if(!validator.isEmail(email)){
        throw new Error("Email is not valid");
    }

    if(!validator.isStrongPassword(password)){
        throw new Error("Password is not Strong Enough")
    }

    const exists = await this.findOne({email})

    if(exists){
        throw new Error("Email already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash})

    return user;
}

//static method for login 

userSchema.statics.login = async function (email, password){
    const user = await this.findOne({email});

    if(!user){
       throw new Error('Invalid email')
    }

    const compare = await bcrypt.compare(password, user.password)
  
    if(!compare){
        throw new Error('Invalid password')
    }

    return user;
}


module.exports = mongoose.model("User", userSchema)