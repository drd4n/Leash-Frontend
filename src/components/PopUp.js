import React, { useState, useEffect, Component } from 'react'
import styled, { css } from 'styled-components'
import axios from 'axios'
import Comments from './Comments'

const Box = styled.div` 
    width: 600px;
    border-radius: 15px; 
    margin: auto;
    margin-top: 20px;
    padding:10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    background-color: #fae3d9
  `
const PostImg = styled.img`
    width: 150px;
    height: 150px;
    padding: 5px;
  `
const PostText = styled.h1`
    font-size: 15px;
    padding: 5px;
`
const Time = styled.p`
    font-size: 10px;
    margin:5px;
`

const PictureLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

const ButtonLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

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
const CommentBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin:10px;
    padding:5px;
    background-color: #aaaaaa;
`

export const PopUp = (props) => {
    const [Imgs, setImgs] = useState([])
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const [isCommentDirty, setIsCommentDirty] = useState(true)

    useEffect(() => {
        if (isCommentDirty) {
            const data2 = {
                post_id: props.post._id
            }
            axios.post('https://leash-khakai-api.herokuapp.com/comment/showComment', data2)
                .then(res => {
                    setComments(res.data)
                    setIsCommentDirty(false)
                })
        }

        const data1 = {
            picture_link: props.post.picture_link
        }
        axios.post('https://leash-khakai-api.herokuapp.com/post/showPostImage', data1)
            .then(res => {
                setImgs(res.data.src);
            })
        
    }, [isCommentDirty, props.post.picture_link, props.post._id])

    function createComment() {
        if (!comment) {
            return alert("please fill out!")
        }
        const data = {
            comment_text: comment,
            post_id: props.post._id
        }
        axios.post("https://leash-khakai-api.herokuapp.com/comment/createComment", data)
            .then(res => {
                setComment('')
                setIsCommentDirty(true)
            }
            )
    }

    return (
        <>
            <Box>
                <p>{props.post._id}</p>
                <PictureLayout>
                    {
                        Imgs.map((img, i) => {
                            return (
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
                    comments.map((comment, i) => {
                        return <Comments key={i} comment={comment} />
                    })
                }
                <CommentBox>
                    <input
                        placeholder="Write your comment?"
                        type="text"
                        value={comment}
                        onChange={(event) => {
                            setComment(event.target.value)
                        }}
                    />
                    <Button onClick={createComment}>Comment</Button>

                </CommentBox>
            </Box>
        </>
    )
}

export default PopUp