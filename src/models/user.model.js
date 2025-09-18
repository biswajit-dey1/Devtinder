import mongoose, { Types } from "mongoose";
import bcrypt from "bcrypt"

import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50

  },

  lastName: {
    type: String,

  },

  password: {
    type: String,
    required: true,
  },

  emailId: {
    type: String,
    required: true,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,

  },

  age: {
    type: String
  },

  gender: {
    type: String,

    validate(value) {
      if (["male", "female", "others"].includes(value)) {

        throw new Error("Enter a valid gender")
      }

    }
  },

  photoUrl: {
    type: String,
    default: "https://geographyandyou.com/images/user-profile.png"
  },

  about: {
    type: String,
    default: "Hi,welcome to my software dev profile"

  },

  skills: {
    type: [String]
  }


})


userSchema.methods.validatePassword = async function (passwordInputUser) {
  const user = this
  const isPasswordValid = await bcrypt.compare(passwordInputUser, user.password)

  return isPasswordValid
}

userSchema.methods.getJwt = async function () {
  const user = this
  
  const token = jwt.sign({_id: user._id},
      "RS256",
    {expiresIn:"7d"})

    return token

}

const User = mongoose.model('User', userSchema)

export default User