import React, { useState, useEffect, Component } from 'react'
import styled, { css } from 'styled-components'
import axios from 'axios'

const Button = styled.button`
background-color: #008CBA;
  border: none;
  color: white;
  padding: 7px 12px;
  text-align: center;
  display: inline-block;
  font-size: 10px;
  cursor: pointer;
`
export const Comments = ({setWillFetch}) => {

const [Comments, setComments] = useState([])
const [Commentdetail, setCommentdetail] = useState([])

async function uploadText() {
    if(!Commentdetail){
        return alert('please fill out your comment')
    } else {
        const data = {
        comment_text: Commentdetail,
    }
    //
    axios.post("https://leash-khakai-api.herokuapp.com/post/createComment", data)
    .then(res => {
        setWillFetch(true)
    })
    .catch((error) => {
        console.log(error)
    })

    setCommentdetail('')
    return console.log("Successfully commented")

    }
}


const data = {
            id : props.post.post_id
        }
        axios.post('https://leash-khakai-api.herokuapp.com/post/showComment', data)
        .then(res => {
            setComments(res.data.src);
        })


return ( 
    <div>
    <Box>
            <p>{props.post._id}</p>
            <PictureLayout>
        {
            Imgs.map((img,i) => {
                return(
                    <PostImg key={i} className="img" src={img}></PostImg>
                )
            })
        }
        </PictureLayout>
            <PostText>{props.post.post_text}</PostText>
            <Time>date XX/XX/XX time XX:XX</Time>
            <ButtonLayout>
                <Button>UPVOTE</Button>
                <Button>DOWNVOTE</Button>
            </ButtonLayout>
                {
                Comments.map((comment,i) => {
                    return(
                        <div>{i}{comment.comment_text}</div>
                    )
                })
                }   
                 <div>
    <input 
        placeholder="Write your comment?" 
        type="text" 
        
         />
         <button onClick={uploadText}>Comment</button>
    </div>
    </Box>
    </div> 
)
}

export default Comments