import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import { validateSignUpdata } from "../utility/validation.js"




const signUp = async (req, res) => {


    try {
        const { firstName, lastName, password, emailId } = req.body

        validateSignUpdata(req)

        const existingUser = await User.findOne({ emailId })
        if (existingUser) {
            return res.status(409).json({
                message: "User already existed",
                succes: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)


        const user = await User.create({
            firstName,
            lastName,
            password: hashedPassword,
            emailId,

        })

        // await user.save() if we create user by new User()

        return res.status(201)
            .json({
                message: "User register succesfully",
                succes: true,
                data: user
            })

    } catch (error) {
        res.status(401)
            .json({
                message: error.message
            })
    }


}


const login = async (req, res) => {

    const { emailId, password } = req.body

    try {

        if (!emailId || !password) {
            throw new Error("All field is required")
        }

        const user = await User.findOne({ emailId })

        const isPasswordValid = await user.validatePassword(password)

        if (!isPasswordValid) {
            return res
                .status(404)
                .json({
                    message: "Invalid Credential",
                    succes: false
                })

        }

        if (!user) {
            return res.
                status(404)
                .json({
                    message: "User not found",
                    succes: false
                })
        }

        

     

        if(isPasswordValid){
           const token = await user.getJwt()

           res.cookie("token",token,{
            expires: new Date(Date.now() +  8 * 3600000)
           })
        }

        res.
            status(201)
            .json({
                message: "LoggedIn sucessfully",
                data: user
            })
    } catch (error) {
        res
            .status(401)
            .json({
                message: error.message,
                succes: false

            })
    }

}


export { signUp, login }