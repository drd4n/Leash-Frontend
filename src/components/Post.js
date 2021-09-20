import React, { useState, useEffect, Component } from 'react'
import styled, { css } from 'styled-components'
import axios from 'axios'
import PopUp from './PopUp'

const Box = styled.div` 
    width: 600px;
    border-radius: 15px; 
    margin: auto;
    margin-top: 20px;
    padding:10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    background-color: #fae3d9;
    display:block;
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
  margin-left: 10px;
  padding: 7px 12px;
  text-align: center;
  display: inline-block;
  font-size: 10px;
  cursor: pointer;
`
const PopupBox = styled.div`
display:none;
`

export const Post = (props) => {
    const [Imgs, setImgs] = useState([])
    const [popup, setPopup] = useState()
    const PopId = props.post._id + "Popup"
    const BoxId = props.post._id + "Box"

    useEffect(() => {
        const data = {
            picture_link: props.post.picture_link
        }
        axios.post('http://localhost:3001/post/showPostImage', data)
            // axios.post('https://leash-khakai-api.herokuapp.com/post/showPostImage', data)
            .then(res => {
                setImgs(res.data.src);
            })

        axios.get(`http://localhost:3001/interaction/showInteraction/${props.post._id}`, {
            headers: { 'x-access-token': localStorage.getItem('token') }
        }).then((res) => {
            console.log(res.data.interaction)
        })

    }, [props.post.picture_link])

    const ShowPopup = () => {
        const post = props.post
        post.picture_link = Imgs
        setPopup(<PopUp props={post} />)
        // document.getElementById(PopId).style.display = "Block";
        // document.getElementById(BoxId).style.display = "none";
    }

    function upvote() {
        axios.post('http://localhost:3001/interaction/upvote', {
            post_id: props.post._id
        },
            {
                headers: { 'x-access-token': localStorage.getItem('token') }
            }).then((res) => {
                console.log(res.data)
            })
    }

    function downvote() {
        axios.post('http://localhost:3001/interaction/downvote', {
            post_id: props.post._id
        },
            {
                headers: { 'x-access-token': localStorage.getItem('token') }
            }).then((res) => {
                console.log(res.data)
            })
    }

    return (
        <div>
            <div>
                {popup}
            </div>
            <PopupBox id={PopId}>
                <PopUp post={props.post} />
            </PopupBox>
            <Box id={BoxId}>
                <PictureLayout>
                    {
                        Imgs.map((img, i) => {
                            return (
                                <PostImg key={i} className="img" src={img}></PostImg>
                            )
                        })
                    }
                </PictureLayout>
                <div>
                    <p>{props.post._id}</p>
                    <PostText>{props.post.post_text}</PostText>
                    <Time>date XX/XX/XX time XX:XX</Time>
                    <span>{props.post.owner.firstname} {props.post.owner.lastname}</span>
                    <ButtonLayout>
                        <div>
                            <Button onClick={() => { upvote() }}>UPVOTE</Button>
                            <Button onClick={() => { downvote() }}>DOWNVOTE</Button>
                        </div>
                        <Button onClick={ShowPopup}>OPEN POST</Button>
                    </ButtonLayout>
                </div>
            </Box>
        </div>
    )
}

export default Post