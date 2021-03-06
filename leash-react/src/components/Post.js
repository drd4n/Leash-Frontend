import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import ImageUploader from 'react-images-upload'

const PostForm = styled.div`
    align-items: center;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const Input = styled.input`
    width: 200px;
`

export const Post = () => {

    const [postDetail, setPostDetail] = useState('')
    const [pictures, setPictures] = useState([])

    const addToFeed = () => {
        //post ไปที่ url ,object ใน format ของ json (เรียกว่า body)
        axios.post("http://localhost:3001/post/createPost", {
            postDetail: postDetail
        })

        console.log("click post")
        setPostDetail('')
    }

    const onDrop = (picture) => { 
        setPictures(pictures.concat(picture))
    }

    const uploadImages = () => {
         pictures.map(image => {
            let data = new FormData();
            data.append("image", image, image.name);
            console.log(data)
            return axios.post('http://localhost:3001/post/uploadImage', data);
        })
        console.log(pictures)
        setPictures([])
    }

    return (
        <PostForm>
            <Input placeholder="What do you want to ask?" type="text" value={postDetail} onChange={(event) => {
                setPostDetail(event.target.value)
            }} />
            <Input placeholder="links" type="text" />
            <ImageUploader
                withPreview={true}
                withIcon={true}
                name='name'
                buttonText='Choose images'
                onChange={onDrop}
                imgExtension={['.jpg', '.gif', '.png']}
                maxFileSize={5242880}
            />
            <button onClick={addToFeed}>add to mongo db via mongoose</button>
            <button onClick={uploadImages}>Upload Images</button>
        </PostForm>
    )
}

export default Post


