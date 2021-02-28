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

    const [postDetail, setPostDetail] = useState('')

    const addToFeed = () => {
        //post ไปที่ url ,object ใน format ของ json (เรียกว่า body)
        axios.post("http://localhost:3001/post/createPost", {
            postDetail: postDetail
        })

        console.log("click post")
        setPostDetail('')
    }
    return (
        <PostForm>
            <Input placeholder="What do you want to ask?" type="text" value={postDetail} onChange={(event) => {
                setPostDetail(event.target.value)
            }} />
            <Input placeholder="links" type="text" />
            <button onClick={addToFeed}>add to mongo db via mongoose</button>
        </PostForm>
    )
}

export default Post


