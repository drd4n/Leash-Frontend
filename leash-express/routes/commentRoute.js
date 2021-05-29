const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const cors = require('cors');
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(express.static('public'));

//Post Models
const CommentModel = require('../models/Comment');

//route to create comment
router.route('/createComment').post((req, res, next) => {
    const commentText = req.body.comment_text
    const postObjectId = req.body.post_id
    const comment = new CommentModel({
        comment_text: commentText,
        post_id: postObjectId
    })

    try{
        comment.save();
        return res.json(comment)
    }catch(error){
        next(error)
    }
})

//route to get comment
router.route('/showComment').post(async (req, res, next) => {
    const postObjectId = req.body.post_id
    const data = await CommentModel.find({post_id: postObjectId})
    try {
        res.json(data)
    }catch(error) {
        return next(error)
    }
})

module.exports = router;