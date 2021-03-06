const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../config/s3config')

const app = express()

app.use(express.json())
app.use(cors())

//aws config
aws.config.update(config.credentials)
const s3 = new aws.S3();

//Post Models
const PostModel = require('../models/Post');

//route createPost
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

//setup where to upload piture to, before route
var upload = multer({
    storage: multerS3({
      s3,
      bucket: 'leash-picture-posting',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, req.s3Key)
      }
    })
  })

//define function upload to s3
const singleFileUpload = upload.single('image');

function uploadToS3(req, res){
    req.s3Key = uuidv4();
    let downloadUrl = `https://s3-${config.region}.amazonaws.com/postpicture/${req.s3Key}`

    return new Promise((reslove, reject) => {
        return singleFileUpload(req, res, err => {
            if(err) return reject(err);
            return reslove(downloadUrl)
        })
    })
}

//route and use the upload function

router.route('/uploadImage').post((req, res, next) => {
    uploadToS3(req, res)
    .then(downloadUrl => {
        console.log(downloadUrl)
        return res.status(200).send({ downloadUrl })
    })
    .catch(e =>{
        console.log(e)
    })
    
})

module.exports = router;