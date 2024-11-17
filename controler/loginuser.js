
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const userSchema = require('../model/userSchema');

const loginuser = async (req, res) => {
    const { username, password } = req.body;

    console.log(username, password)

    if (!username || !password) {
        return res.status(500).json({ message: "please fill all details" })
    }
    try {
        const user = await userSchema.findOne({
            $or: [
                { username: username },
                { email: username }
            ]
        })
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // console.log(user)

        const matchpassword = await bcrypt.compare(password, user.password)

        // console.log(matchpassword)

        if (!matchpassword) {
            return res.status(401).json({ message: "password not match" });
        }

        const token = JWT.sign(
            { id: user._id },
            // { user: user },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        // console.error("Error in folower:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }

}

module.exports = { loginuser }