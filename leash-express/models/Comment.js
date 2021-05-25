const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    comment_text: {
        type: String,
        require: true
    },
    upvote: {
        type: [mongoose.Types._ObjectId]
    },
    downvote: {
        type: [mongoose.Types._ObjectId]
    },
    // user_id: {
    //     type: mongoose.Types._ObjectId,
    //     require: true
    // },
    post_id: {
        type: String
    }
},
    {
        collection: "comments"
    }
);
const Comment = mongoose.model("Comment", CommentSchema)
module.exports = Comment