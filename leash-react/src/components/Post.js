import React, { useEffect, useState } from 'react'
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
    const [uploadedpics, setUploadedpics] = useState([])
    const [isDirty, setisDirty] = useState(false)

    async function uploadText() {
        console.log("detail: " + postDetail)
        console.log(uploadedpics)
        const data = {
            post_text: postDetail,
            picture_link: uploadedpics
        }
        console.log("data = ")
        console.log(JSON.stringify(data))
        //post ไปที่ url ,object ใน format ของ json (เรียกว่า body)
        axios.post("http://localhost:3001/post/createPost", data)

        //  setPostDetail('')
        //  setPictures([])  
        //  setPictureLink([])
    }

    function onDrop(selectedImage) {
        let temp = [];
        //pictures.map(image => {
            let formData = new FormData()
            formData.append("image", selectedImage, selectedImage.name)
            console.log(formData)
            axios.post('http://localhost:3001/post/uploadImage', formData)
                .then(res => {
                    uploadedpics.push(res.data.picture_link)
                    console.log(JSON.stringify(uploadedpics)) 
                    setisDirty(true) 
                })
        return temp;
}

useEffect(() => {
    if(isDirty){
        setUploadedpics(uploadedpics)
        axios.get(`http://localhost:3001/post/showSelectedImage/${uploadedpics[0]}`)
        .then(res => console.log(res))
        setisDirty(false)
    }
},[isDirty, uploadedpics])

return (
    <PostForm>
        <Input 
            placeholder="What do you want to ask?" 
            type="text" 
            value={postDetail} 
            onChange={(event) => {
            setPostDetail(event.target.value)
        }} />
        {/* <ImageUploader
                withPreview={true}
                withIcon={true}
                name='name'
                buttonText='Choose images'
                onChange={onDrop}
                imgExtension={['.jpg', '.gif', '.png']}
                maxFileSize={5242880}
            /> */}
        <Input
            type="file"
            id="selectedFile"
            onChange={(event) => {
                onDrop(event.target.files[0])
            }}
            style={{ display: 'none' }}
        />
        {
            uploadedpics.map(shower =>{
                return <img key={shower.index} src={shower} alt={shower.name} />
                    }
                )
        }
        <button onClick={() => { document.getElementById('selectedFile').click(); }}>Pick File</button>
        <button onClick={uploadText}>add to mongo db via mongoose</button>
        {/* <button onClick={uploadImages}>Upload Images</button> */}
    </PostForm>
    )
}
export default Post


