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

router.route('/createComment').post((req, res, next) => {
    const commentText = req.body.comment_text
    const postObjectId = req.body.postObjectId
    const comment = new CommentModel({
        comment_text: commentText,
        postObjectId: postObjectId
    })

    try{
        comment.save();
        return res.json(comment)
    }catch(error){
        next(error)
    }
})

module.exports = router;