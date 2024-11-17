const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const blogSchema = new Schema ({
    // tittle : {
    //     type:Schema.Types.ObjectId,
    //     required:true,
    //     ref:'User'
    // },
    textBody : {
        type:String,
        required: true,
        trim: true,
    },
    creationDateTime : {
        type :String,
        required :true
    },
    userId : {
        type: Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    img:{
        type:String
    },
    likes : [
        {
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    comments : [
        {
            text: {
                type: String,
                required: true,
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: "user",
                required: true
            },
        }
    ],    
}, 
{
    strict: false,
    timestamps: true
}
)

module.exports = mongoose.model('blog', blogSchema)