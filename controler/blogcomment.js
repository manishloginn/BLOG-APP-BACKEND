const blogSchema = require("../model/blogSchema");

const blogcomment = async (req, res) => {
    const {blogid, comment, userid} = req.body;
    // console.log(blogid, comment, userid)


    if (!blogid || !comment || !userid) {
        return res.status(400).json({ message: "Invalid input. Blog ID, comment, and user ID are required." });
    }

    try {
        const findblog = await blogSchema.findById({_id:blogid}).populate('comments.user', 'name email')

        if(!findblog){
            return res.status(500).json({message:"blog not found"})
        }
        const newComment = {
            text: comment,
            user: userid,
        };

        findblog.comments.push(newComment);
        

        await findblog.save();

        const populatedBlog = await blogSchema.findById(blogid).populate('comments.user', 'name email');


        // console.log(populatedBlog)
        return res.status(200).json({
            message: "Comment added successfully",
            comments: populatedBlog.comments,
        });       
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
} 

module.exports = {blogcomment}