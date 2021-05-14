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
    const [shower, setShower] = useState([])
    const [isDirty, setisDirty] = useState(false)

    async function uploadText() {
        if(!postDetail){
            return alert('please fill out what you want to ask')
        } else {
            const data = {
            post_text: postDetail,
            picture_link: uploadedpics
        }
        //post ไปที่ url ,object ใน format ของ json (เรียกว่า body)
        axios.post("http://localhost:3001/post/createPost", data)

        setPostDetail('')
        setUploadedpics([])
        setShower([])
        return console.log("Successfully posted")
        }
        
    }

    function onDrop(selectedImage) {
        let temp = [];
        //pictures.map(image => {
            let formData = new FormData()
            formData.append("image", selectedImage, selectedImage)
            console.log(formData)
            axios.post('http://localhost:3001/post/uploadImage', formData)
                .then(res => {
                    shower.push(res.data.src)
                    uploadedpics.push(res.data.picture_link) 
                    setisDirty(true) 
                })
        return temp;
}

    function removeSelectedImage(index) {
        const key = uploadedpics[index]
        axios.post(`http://localhost:3001/post/removeSelectedImage/${key}`)
        .then(res => {
            uploadedpics.splice(index, 1)
            shower.splice(index, 1)
            setisDirty(true)
            console.log(JSON.stringify(uploadedpics))
            console.log(res.data)
        })
    }

useEffect(() => {
    if(isDirty){
        setShower(shower)
        // uploadedpics.map(getShower => {
        //     axios.get(`http://localhost:3001/post/showSelectedImage/${getShower}`)
        //     .then(res => {
        //         shower.push(res.data.src)
        //     })
        // return "Shown uploaded images"
        // })
        // console.log(JSON.stringify(shower))
        setisDirty(false)
    }
},[isDirty, shower])

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
            shower.map(shwr =>{
                        return <div>
                            <img key={shower.indexOf(shwr)} src={shwr} alt={shower.indexOf(shwr)} />
                            <button onClick={() => removeSelectedImage(shower.indexOf(shwr))} >Remove</button>
                        </div>
                    }
                )
        }
        {/* {
            uploadedpics.map(remover => {
                return <form key={uploadedpics.indexOf(remover)} action={removeSelectedImage(remover)}>
                    <input type="submit" value="Remove"/>
                </form>
            })
        } */}
        <button onClick={() => { document.getElementById('selectedFile').click(); }}>Pick File</button>
        <button onClick={uploadText}>add to mongo db via mongoose</button>
        {/* <button onClick={uploadImages}>Upload Images</button> */}
    </PostForm>
    )
}
export default Post


