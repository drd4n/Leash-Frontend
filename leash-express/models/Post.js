const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    post_text: {
        type: String,
        required: true
    },
    picture_link: {
        type: [String]
    },
    upvote: {
        type: [mongoose.Types._ObjectId]
    },
    downvote: {
        type: [mongoose.Types._ObjectId]
    },
    tag: {
        type: [String]
    },
    // user_id: {
    //     type: mongoose.Types._ObjectId
    //     //require: true
    // }
}, 
    {
    collection : "posts"
    }
);

const Post = mongoose.model("Post", PostSchema)
module.exports = Post