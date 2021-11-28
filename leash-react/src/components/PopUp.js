import React, { useState, useEffect, Component } from 'react'
import styled, { css } from 'styled-components'
import axios from 'axios'
import Comments from './Comments'
import { Link } from 'react-router-dom'

const Flex = styled.div` 
    padding: 0;
    margin: 0;
    position: fixed;
    flex-shrink: 0;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(4px);
    overflow: auto;
    z-index: 1;
`

const Background = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `

const Box = styled.div` 
    width: 600px;
    flex-direction: column;
    border-radius: 15px; 
    background-color: #242526;
    position: center;
    margin: auto;
    margin-top: 80px;
    margin-bottom: 80px;
  `


const PostImg = styled.img`
    max-height: 250px;
    border-radius: 5%;
    padding: 5px;
  `

const ProfileImg = styled.img`
    transform: translateX(-50px);
    border-radius: 50%;
    border: 1px solid #18191A;
    width: 80px;
    height: 80px;
    margin-left: -80px;
  `

const TextBox = styled.div`
    font-size: 15px;
    padding: 8px;
    color: white;
    width: 550px;
    border-radius: 15px; 
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #3A3B3C;
`

const PictureLayout = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    padding: 10px;
`

const Button = styled.button`
    display: inline-block;
    height: 45px;
    width: 100px;
    font-weight: 400;
    font-size: 14px;
    text-transform: uppercase;
    border: none;
    border-radius: 44px;
    cursor: pointer;
    margin-right: -6em;
    transition: all 0.3s ease-out;
    background: #75B2B2;
    color: #FFFFFF;
`

const XButton = styled(Button)`
    background: #a9a9a9;
    margin-right: -3em;
    margin-top: -1.2em;
    height: 40px;
    width: 40px;
    font-weight: 600;
    font-size: 18px;
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

const Spacearound = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px;
  margin-top: -8px;
`

const OwnerName = styled.div`
    color: #FFFFFF;
    font-size: 26px;
    font-weight: 550;
    letter-spacing: 0.2px;
    height: 20px;
    width: 480px;
    margin-left: -90px;
    margin-bottom: 0px;
    margin-top: 25px;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
`

const VerifiedBadge = styled.img`
    height: 20px;
    width: 20px;
    padding: 2px;
`

export const PopUp = (props) => {
    const [Imgs, setImgs] = useState([])
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const [isCommentDirty, setIsCommentDirty] = useState(true)
    const [profilePicture, setProfilePicture] = useState()


    useEffect(async () => {
        if (isCommentDirty) {

            await axios.get(process.env.REACT_APP_NODE_ENDPOINT+`/comment/showComment/${props.props._id}`)
                .then(res => {
                    setComments(res.data)
                    setIsCommentDirty(false)
                })
        }

        if (props.props.owner.profile_picture) {
            axios.get(process.env.REACT_APP_NODE_ENDPOINT+`/auth/showProfileImage/${props.props.owner.profile_picture}`, {
                headers: { 'x-access-token': localStorage.getItem('token') }
            })
                .then((res) => {
                    setProfilePicture(res.data.profile_src)
                })
        }

        if (props.props.src) {
            setImgs(props.props.src)
        }

    }, [isCommentDirty, props.props.src, props.props._id, props.props.profile_picture, props.props.src])

    function createComment() {
        if (!comment) {
            return alert("please fill out!")
        }
        const data = {
            comment_text: comment,
            post_id: props.props._id,
            tags: props.props.tags
        }
        axios.post(process.env.REACT_APP_NODE_ENDPOINT+`/comment/createComment`, data,
            {
                headers: { 'x-access-token': localStorage.getItem('token') }
            }).then(res => {
                setComment('')
                setIsCommentDirty(true)
            }
            )
    }

    
    const id = "popUpToProfile"+props.props.owner_id

    async function toProfile() {
            return document.getElementById(id).click()
    }

    function close() {
        props.setWillClose(true)
    }

    function isVerified(approval_status) {
        if (approval_status === "approved") {
            return <VerifiedBadge src="./Verified.png" />
        }
    }

    return (
        <Flex>
            <Background>
                <Box>
                    <Spacearound>
                        <Link id={id} to={{ pathname: "/profile", owner_id: props.props.owner_id }}></Link>
                        <ProfileImg src={profilePicture} onClick={toProfile} />
                        <OwnerName onClick={toProfile}>{props.props.owner.firstname} {props.props.owner.lastname} {isVerified(props.props.owner.approval_status)}</OwnerName>
                        <XButton onClick={close}>X</XButton>
                    </Spacearound>
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
                    
                    <Column>
                        {
                            comments.map((comment, i) => {
                                return <Comments key={i} comment={comment} />
                            })
                        }
                    </Column>
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
        </Flex>
    )
}

export default PopUp