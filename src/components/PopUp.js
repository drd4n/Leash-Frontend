import React, { useState, useEffect, Component } from 'react'
import styled, { css } from 'styled-components'
import axios from 'axios'
import Comments from './Comments'

const Box = styled.div` 
    width: 600px;
    border-radius: 15px; 
    margin: auto;
    /* margin-top: 20px; */
    /* transform: translate(50vh,50vh); */
    padding:10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    background-color: #fae3d9;
    /* display: block; */
    margin: 0 auto;
    margin-top: calc(100vh - 85vh + 200px);
  `
const Background = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    left: 0;
    top: 0;
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

    useEffect(async() => {
        if (isCommentDirty) {

            await axios.get(`http://localhost:3001/comment/showComment/${props._id}`)
                .then(res => {
                    setComments(res.data)
                    setIsCommentDirty(false)
                })
        }
    }, [isCommentDirty, props.picture_link, props._id])

    function createComment() {
        if (!comment) {
            return alert("please fill out!")
        }
        const data = {
            comment_text: comment,
            post_id: props._id
        }
        axios.post("http://localhost:3001/comment/createComment", data)
            .then(res => {
                setComment('')
                setIsCommentDirty(true)
            }
            )
    }

    return (
        <Background>
            <Box>
                <p>{props._id}</p>
                {/* <PictureLayout> */}
                    {/* {
                        Imgs.map((img, i) => {
                            return (
                                <PostImg key={i} className="img" src={img}></PostImg>
                            )
                        })
                    }
                </PictureLayout>
                <PostText>{props.post_text}</PostText>
                <Time>date XX/XX/XX time XX:XX</Time> */}
                {
                    comments.map((comment, i) => {
                        return <Comments key={i} comment={comment} />
                    })
                }
                {/* <CommentBox>
                    <input
                        placeholder="Write your comment?"
                        type="text"
                        value={comment}
                        onChange={(event) => {
                            setComment(event.target.value)
                        }}
                    />
                    <Button onClick={createComment}>Comment</Button> */}

                {/* </CommentBox> */}
            </Box>
        </Background>
    )
}

export default PopUp