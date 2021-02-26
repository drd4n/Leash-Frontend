const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors');
const app = express()

const PostModel = require('./models/Post.js');

app.use(express.json())
app.use(cors())

mongoose.connect(
    "mongodb+srv://leashposts:leashmasterposts@leashposts.t5u93.mongodb.net/post?retryWrites=true&w=majority",
    {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});


app.post('/createPost', async (req, res) => {

    const postDetails = req.body.postDetails
    const post = new PostModel({postDetail: postDetails})

    try {
        await post.save();
        res.send("imported data")
    }catch(error){
        console.log(error)
    }
});

app.listen(3001, () => {
    console.log('Yark Ja Norn on port 3001')

});