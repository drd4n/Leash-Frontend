import React, { useState, useEffect, Component } from 'react'
import styled, { css } from 'styled-components'
import axios from 'axios'

const Box = styled.div` 
    width: 300px;
    height: 250px;
    margin: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  `
const PostImg = styled.img`
    width: 300px;
    height: 150px;
    padding: 0px;
    margin: 0px;
  `
const PostText = styled.h1`
    font-size: 15px;
    padding: 5px;
`
const Time = styled.p`
    font-size: 10px;
    margin:5px;
`

export const Post = (props) => {
    const [Imgs, setImgs] = useState([])
    
    useEffect(() => {
        const data = {
            picture_link : props.post.picture_link
        }
        axios.post('http://localhost:3001/post/showPostImage', data)
        .then(res => {
            setImgs(res.data.src);
        })
    },[props.post.picture_link])
console.log(props.post._id) //เอาอันนี้ส่งมาตอนเข้าหน้าโพสแยกกับตอนคอมเม้นด้วย
    return ( 
        <Box>
        {
                Imgs.map((img,i) => {
                    return(
                        <PostImg key={i} className="img" src={img}></PostImg>
                    )
                })
            }
            <PostText>{props.post.post_text}</PostText>
            <Time>date XX/XX/XX time XX:XX</Time>
            
       </Box>
    )
}

export default Post