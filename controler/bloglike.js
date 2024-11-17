const blogSchema = require("../model/blogSchema");

const bloglike = async (req, res) => {
    const { blogId, userId } = req.body;

    console.log(blogId, userId);

    if (!blogId || !userId) {
        return res.status(400).json({ message: "Blog ID and User ID are required" });
    }

    try {
        const blog = await blogSchema.findById(blogId);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

       
        if (!Array.isArray(blog.likes)) {
            blog.likes = [];
        }

       
        if (!userId) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
               
        const alreadyLiked = blog.likes.some((user) => user && user.toString() === userId.toString());

        if (alreadyLiked) {
           
            blog.likes = blog.likes.filter((user) => user && user.toString() !== userId.toString());
        } else {
           
            blog.likes.push(userId);
        }

        await blog.save();

        return res.status(200).json({
            message: alreadyLiked ? "Blog unliked" : "Blog liked",
            likes: blog.likes.length,
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { bloglike };
