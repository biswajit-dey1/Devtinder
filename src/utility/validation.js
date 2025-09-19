import validator from "validator"

const validateSignUpdata = (req) => {

    const { firstName, lastName, password, emailId, } = req.body

    if (!firstName || !lastName || !password || !emailId) {
        throw new Error("All field are required")
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid")
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Enter a strong password")
    }
}

const validateEditUpdate = (req) => {

    const allowedUpdate = ["firstName", "lastName", "emailId", "age", "gender", "photoUrl", "about", "skills"]

    const isEditAllowed = Object.keys(req.body).every((field) => (allowedUpdate.includes(field)))

    return isEditAllowed
}

export { validateSignUpdata,validateEditUpdate }