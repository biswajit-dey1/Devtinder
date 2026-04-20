import User from "../models/User.model.js"

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password")
    return res.status(200).json({
      message: "Users fetched successfully",
      success: true,
      data: users
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false
    })
  }
}

const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params
    const { role } = req.body

    if (!role || !["user", "admin", "moderator"].includes(role)) {
      return res.status(400).json({
        message: "Invalid or missing role",
        success: false
      })
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    ).select("-password")

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      })
    }

    return res.status(200).json({
      message: "User role updated successfully",
      success: true,
      data: user
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false
    })
  }
}

export { getAllUsers, updateUserRole }
