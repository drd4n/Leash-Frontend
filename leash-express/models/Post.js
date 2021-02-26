const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    postDetail: {
        type: String,
        required: true
    },
    postPictureLink: {
        type: String
    }
});

const Post = mongoose.model("Post", PostSchema)
module.exports = Post