const blogSchema = require("../model/blogSchema");
const userSchema = require("../model/userSchema");

const getblog = async (req, res) => {

    const { userid } = req.query;
    // console.log(userid)

    if (!userid) {
        return res.status(500).json('no user login')
    }

    try {
        const user = await userSchema.findById(userid).populate('folowing', "_id")
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const folowersid = user.folowing.map(follower => follower._id)
        // console.log(folowersid)

        const findBlog = await blogSchema
            .find({ userId: { $in: [userid, ...folowersid] } })
            .populate("userId", "name email")
            .populate("comments.user", "name email")
            .sort({ createdAt: -1 });

            console.log(findBlog)

        if (!findBlog || findBlog.length === 0) {
            return res.status(404).json({ message: "No blogs found" });
        }
        return res.status(200).json({ message: "blog fetch successfull", data: findBlog })
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = { getblog }