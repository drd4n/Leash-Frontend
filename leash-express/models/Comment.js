const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    comment_text: {
        type: String
    },
    upvote: {
        type: [mongoose.Types._ObjectId]
    },
    downvote: {
        type: [mongoose.Types._ObjectId]
    },
    user_id: {
        type: mongoose.Types._ObjectId
    },
    post_id: {
        type: mongoose.Types._ObjectId
    }
},
    {
        collection: "comments"
    }
);

module.exports = mongoose.model("Comment", commentSchema)