const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const aws = require('aws-sdk');
const config = require('../config/s3config')
const createError = require('http-errors')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(express.static('public'));

//Post Models
const PostModel = require('../models/Post');


//route to get all post
router.route('/').get((req, res) => {
    PostModel.find((error, data) => {
        try{
            res.json(data)
        }catch(error){
            return next(error)
        }
    })
})

module.exports = router;