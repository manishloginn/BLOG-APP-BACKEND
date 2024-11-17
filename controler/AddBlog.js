const blogSchema = require("../model/blogSchema");
const { blogValidator } = require("../utils/blogValidator");

const AddBlog = async (req, res) => {
    const {textBody, userId, img } = req.body;
    try {
        await blogValidator({textBody, userId })
    } catch (error) {
        return res.status(400).json(error)
    }
    try {
        const newblog = new blogSchema({
            textBody,
            creationDateTime: new Date(),
            userId,
            img
        })

        await newblog.save()
        return res.status(200).json({message:"blog add successfull"})
    } catch (error) {
        return res.status(500).json({message:error})
    }
} 

module.exports = { AddBlog }