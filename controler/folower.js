const userSchema = require("../model/userSchema");

const folower = async (req, res) => {
    const { userid, folowerid } = req.body;

    if (!userid || !folowerid) {
        return res.status(400).json({ message: "Please send both 'userid' and 'folowerid'" });
    }
    try {
        const userToFollow = await userSchema.findById(folowerid);
        const userFollowing = await userSchema.findById(userid);

        if (!userToFollow || !userFollowing) {
            return res.status(404).json({ message: "User(s) not found" });
        }
        if (userFollowing.folowing.includes(folowerid)) {
            return res.status(404).json({ message: "You are already following this user" });
        }

        userFollowing.folowing.push(folowerid);
        userToFollow.folowers.push(userid);

       
        await userFollowing.save();
        await userToFollow.save();

        res.status(200).json({ message: "Followed successfully", userFollowing, userToFollow });

    } catch (error) {
       
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = { folower };
