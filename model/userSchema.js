const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImg: {
        type: String,
        default: "",
    },
    coverImg: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
    },
    folowers: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required:true,
        }
    ],
    folowing: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required:true,
        }
    ]
}, {
    strict: false,
    timestamps: true
})


module.exports = mongoose.model('user', userSchema)
