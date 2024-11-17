const userSchema = require("../model/userSchema")

const allusers = async (req, res) => {

    try {
        const allusers = await userSchema.find()
        if(!allusers){
            return res.status(500).json('no users found')
        }
        return res.status(200).json({message:"user fetch", data:allusers})
    } catch (error) {
        return res.status(500).json({message:error})
    }
}


module.exports = {allusers}