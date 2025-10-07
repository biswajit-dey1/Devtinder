import User from "../models/User.model.js"
import { validateEditUpdate } from "../utility/validation.js"

const getProfile = (req, res) => {

   try {
      const loggedInUser = req.user

      if (!loggedInUser) {
         throw new Error("User not found")
      }

      res.
         status(200)
         .json({
            message: "Profile fetched Succesfully",
            data: loggedInUser
         })

   } catch (error) {

      res.
         status(404)
         .json({
            message: error.message
         })
   }

}

const updateProfile = async (req, res) => {

   try {
      const { _id } = req.user

      if (!validateEditUpdate(req)) {

         res.status(404)
            .json({
               message: "Enter valid field",
               success: false
            })
      }

      const updateUser = await User.findByIdAndUpdate(_id, {
         $set: req.body
      }, {
         new: true
      }
      ).select(
         "-password"
      )

      if (!updateUser) {
         throw new Error("updated user not found")
      }

      res.status(201)
         .json({
            message: "User updated succesfully",
            success: true,
            data: updateUser
         })
   } catch (error) {

      res.status(401)
      json({
         message: error.message
      })
   }


}

export { getProfile, updateProfile }