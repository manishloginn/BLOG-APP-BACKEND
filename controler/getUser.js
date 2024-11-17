const userSchema = require("../model/userSchema");

const getUser =  async (req, res) => {
    const {id} = req.query;
    // console.log(id)

    if (!id){
        return res.status(500).json('no user login')
    }

    try {
        const userDetail = await userSchema.findById(id); 
        if (!userDetail) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(userDetail);
        

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = { getUser}