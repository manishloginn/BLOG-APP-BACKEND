const userSchema = require("../model/userSchema");
const { uservalidator } = require("../utils/uservalidator")
const bcrypt = require('bcryptjs')

const Registeruser = async (req, res) => {
    const { name, username, email, password } = req.body;

    // console.log(name, username, email, password)
    try {
      await  uservalidator({ name, username, email, password })
    } catch (error) {
        return res.status(400).json(error)
    }
    try {
        const existingUser = await userSchema.findOne({ username })
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }
        const hashPassword = await bcrypt.hash(
            password,
            parseInt(process.env.SALT)
        )
        const userObj = new userSchema({
            name: name,
            email: email,
            username: username,
            password: hashPassword,
        });
        await userObj.save();
       return res.status(200).json('user registered successfull')
    } catch (error) {
        return res.send({
            status: 500,
            message: "Internal server error",
            error: error,
        });
    }
};

const afterRegistration = async (req, res) => {
    const {profileImg, coverImg, bio } = req.body;
    const {username} = req.body;
    try {
        const user = await userSchema.findOne({username})
        if(!user){
            return res.status(404).json({message:"User Not FounD"})
        }

        user.profileImg = profileImg,
        user.coverImg = coverImg,
        user.bio = bio
        
        user.save()

        return res.status(200).json({message:'User Detail Updated'})
        
    } catch (error) {
        return res.status(500).json({message:error})
    }
} 





module.exports = { Registeruser, afterRegistration };
