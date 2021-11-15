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
    background-color: #242526;
    display: flex;
    flex-direction: column;
    border: 3px solid whitesmoke;
  `
const Background = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    left: 0;
    top: 0;
  `


const PostImg = styled.img`
    height: 200px;
    padding: 5px;
  `
const TextBox = styled.div`
    font-size: 15px;
    padding: 5px;
    color: white;
    width: 550px;
    border-radius: 15px; 
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    padding:10px;
    background-color: #3A3B3C;
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
    align-self: center;
    padding: 11px 20px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border:none;
    border-radius: 44px;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
`
const CommentBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    border:none;
    border-radius: 44px;
    margin:10px;
    padding:5px;
    background-color: #aaaaaa;
`
const Input = styled.input`
    max-width: 100%;
    min-width: 50%;
    padding: 10px;
    border:none;
    border-radius: 44px;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);

`

export const PopUp = (props) => {
    const [Imgs, setImgs] = useState([])
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const [isCommentDirty, setIsCommentDirty] = useState(true)

    useEffect(async() => {
        if (isCommentDirty) {

            await axios.get(`http://localhost:3001/comment/showComment/${props.props._id}`)
                .then(res => {
                    setComments(res.data)
                    setIsCommentDirty(false)
                })
        }

        if(props.props.src){
            setImgs(props.props.src)
        }
       
    }, [isCommentDirty, props.props.src, props.props._id])

    function createComment() {
        if (!comment) {
            return alert("please fill out!")
        }
        const data = {
            comment_text: comment,
            post_id: props.props._id,
            tags:props.props.tags
        }
        axios.post("http://localhost:3001/comment/createComment", data,
        {
            headers: { 'x-access-token': localStorage.getItem('token') }
        }).then(res => {
                setComment('')
                setIsCommentDirty(true)
            }
            )
    }

    function close() {
        props.setWillClose(true)
    }
    
    return (
        <Background>
            <Box>
                <button onClick={close}>X</button>
                <p>{props.props._id}</p>
                <PictureLayout>
                    {
                        Imgs.map((img, i) => {
                            return (
                                <PostImg key={i} className="img" src={img}></PostImg>
                            )
                        })
                    }
                </PictureLayout>
                <TextBox>{props.props.post_text}</TextBox>
                {
                    comments.map((comment, i) => {
                        return <Comments key={i} comment={comment} />
                    })
                }
                <CommentBox>
                    <Input
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
        </Background>
    )
}

export default PopUp