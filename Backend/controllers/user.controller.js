const userModel = require("../models/user.model")
const bcrypt = require("bcrypt");

const saltRounds = 5

const registerUser = async (req, res) => {
    try {
        const data = req.body
        if (!data || Object.keys(data).length === 0) {
            return res.status(422).json({
                "success": false,
                "message": "Incorrect parameters received"
            })
        }

        // password hash
        data.password = await bcrypt.hash(data.password, saltRounds)

        await userModel.create(data)

        res.status(201).json({
            "success": true,
            "message": "User created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "failed during user creation"
        });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(401).json({
                "success": false,
                "message": "Invalid Email"
            })
        }

        const passwordCheck = await bcrypt.compare(password, user.password)
        if (!passwordCheck) {
            return res.status(401).json({
                "success": false,
                "message": "Incorrect Password"
            })
        }
        return res.status(200).json({
            "success": true,
            "message": `Welcome ${user.name}`
        })

    } catch (error) {
        return res.status(422).json({
            "success": false,
            "message": "Login Failed"
        })
    }
}



module.exports = {
    registerUser,
    loginUser
}