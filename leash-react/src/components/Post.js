import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

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

    const [postDetails, setPostDetails] = useState('')

    const addToFeed = () => {
        //post ไปที่ url ,object ใน format ของ json (เรียกว่า body)
        axios.post("http://localhost:3001/createPost", {
            postDetails: postDetails
        });
        console.log("click post")
    }
    return (
        <PostForm>
            <Input placeholder="What do you want to ask?" type="text" onChange={(event) => {
                setPostDetails(event.target.value)
            }} />
            <Input placeholder="links" type="text" />
            <button onClick={addToFeed}>add to mongo db via mongoose</button>
        </PostForm>
    )
}

export default Post


