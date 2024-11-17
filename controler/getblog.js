const blogSchema = require("../model/blogSchema");

const getblog = async (req, res) => {

    const { userid } = req.query;

    // console.log(userid)

    if (!userid) {
        return res.status(500).json('no user login')
    }

    try {
        const findBlog = await blogSchema
            .find({ userId: userid })
            .populate("userId", "name email")
            .populate("comments.user", "name email");

        if (!findBlog || findBlog.length === 0) {
            return res.status(404).json({ message: "No blogs found" });
        }
        return res.status(200).json({ message: "blog fetch successfull", data: findBlog })
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = { getblog }