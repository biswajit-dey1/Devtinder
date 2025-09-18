import User from "../models/user.model.js"
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

        const user = await User.create({
            firstName,
            lastName,
            password,
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
                message: ` ${error}`
            })
    }


}



export { signUp }