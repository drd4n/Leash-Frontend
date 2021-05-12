const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
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

//route createPost
router.route('/createPost').post((req, res, next) => {
    const post_text = req.body.post_text
    const picture_link = req.body.picture_link
    console.log("picture link array")
    console.log(picture_link)
    const post = new PostModel({post_text: post_text,
                                picture_link: picture_link})

    try {
        post.save();
        res.send("imported data")
    }catch(error){
        return next(error);
    }
}) 


//aws config
aws.config.update(config.credentials)
const s3 = new aws.S3();

//setup where to upload piture to, before route
var uploadPicture = multer({
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
const singleFileUpload = uploadPicture.single('image');

function uploadToS3(req, res){
    req.s3Key = uuidv4();
    //let downloadUrl = `https://s3-${config.region}.amazonaws.com/leash-picture-posting/${req.s3Key}`
    let downloadUrl = `${req.s3Key}`
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
        const param = {
          Bucket: "leash-picture-posting",
          Key: downloadUrl
        }
        s3.getObject(param, function(err, data){
          if(err) console.log(err)
        console.log(data)
        const b64 = Buffer.from(data.Body).toString('base64');
        const mimeType = 'image/jpg';
        return res.json({src :`data:${mimeType};base64,${b64}`,
                         picture_link: downloadUrl});
          }
          )
        //return res.json({ picture_link: downloadUrl})
    })
    .catch(e =>{
        console.log(e)
        next(e)
    })
    
})

router.route(`/showSelectedImage/:s3key`).get((req, res, next)=> {
    const param = {
      Bucket: "leash-picture-posting",
      Key: req.params.s3key
    }
    s3.getObject(param, function(err, data){
      if(err) console.log(err)
    console.log(data)
    const b64 = Buffer.from(data.Body).toString('base64');
    const mimeType = 'image/jpg';
    res.json({src :`data:${mimeType};base64,${b64}`});
      }
      )
})

// const params = {
//   Bucket: "leash-picture-posting",
//   Key: "210bea71-2d7a-4b59-8ed0-f8c45d848ceb"
// }

// s3.getObject(params, function(err, data){
//   if(err) console.log(err, err.stack);
//   else {
//     const b64 = Buffer.from(data.Body).toString('base64');
//         const mimeType = 'image/jpg';
//         res.send(`<img src="data:${mimeType};base64,${b64}" />`);
//   }
// })

module.exports = router;