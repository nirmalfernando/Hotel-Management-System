    import User from "../models/user.js"
    import bcrypt from "bcryptjs"
    import jwt from "jsonwebtoken"
    import dotenv from "dotenv"

    // Load the environment variables from .env file
    dotenv.config()

    const JWT_Secret = process.env.JWT

    export const register = async (req,res) => {
        const { username, email, password, contactNumber, role} = req.body

        try{
            // Check if the User already exists
            const existingUser = await User.findOne({username})
            if (existingUser) {
                return res.status(409).json("User already exists!")
            }

            // Encrypt the password
            const salt = bcrypt.genSaltSync(20)
            const hashedPassword = bcrypt.hashSync(password, salt)

            // Create a new user
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                contactNumber,
                role,
                status: 0
            })

            // Save the User to the database
            await newUser.save()
            return res.status(200).json("User has been created!")
        }
        catch(err){ 
            return res.status(500).json(err.message)
        }
    }

    export const login = async (req,res) => {
        try{
            // Check if the user exists
            const user =  await User.findOne({ username: req.body.username, status: 'active'})
            if (!user) return res.status(404).json("User not found!")

            // Check the password
            const checkPassword = bcrypt.compareSync(req.body.password, user.password)
            if (!checkPassword) return res.status(400).json("Wrong Password or Username!")

            // Generate a JWT token
            const token = jwt.sign(
                { username: user.username, role: user.role },
                JWT_Secret,
                { expiresIn: "1h" } // Token expiry time
            )

            // Exclude password from the response
            const { password, ...userData } = user._doc

            // Set the token as an HTTP-only cookie
            res.cookie("accessToken", token, {
                httpOnly: true,
            }).status(200).json(userData)
        }
        catch(err){
            return res.status(500).json(err.message)
        }
    }

    export const logout = (req,res) => {
        res.clearCookie("accessToken", {
            secure: true,
            sameSite: "none"
        }).status(200).json("User has been logged out!")
    }