const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
var cors = require('cors');

const app = express()

app.use(express.json())
app.use(cors())

//Post Models
const PostModel = require('../models/Post');

//route
router.route('/createPost').post((req, res, next) => {
    const postDetail = req.body.postDetail
    const post = new PostModel({postDetail: postDetail})

    try {
        post.save();
        res.send("imported data")
    }catch(error){
        return next(error);
    }
}) 

module.exports = router;