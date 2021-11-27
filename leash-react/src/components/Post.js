import React, { useState, useEffect, Component } from 'react'
import styled, { css } from 'styled-components'
import axios from 'axios'
import PopUp from './PopUp'
import { Link } from 'react-router-dom'

const Flex = styled.div` 
    display:flex;
`


const Box = styled.div` 
    width: 600px;
    border-radius: 15px; 
    margin: auto;
    margin-top: 20px;
    padding:10px;
    background-color: #242526;
    display: flex;
    flex-direction: column;
  `
const PostOwnerImg = styled.img`
    transform: translateX(-50px);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 1px solid #18191A;
    display: flex;
`
const PostOwner = styled.div`
    display: flex;
    margin: 0px;
    color: #FFFFFF;
    font-size: 30px;
    flex-direction: column;
  `

const OwnerName = styled.div`
    color: #FFFFFF;
    font-size: 25px;
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

const Spacebetween = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Spacearound = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`
const FlexStart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const TagBox = styled.div`
    background: #75B2B2;
    padding: 7px;
    margin: 10px;
    border: none;
    border-radius: 44px;
    font-size: 13px;
    text-transform: uppercase;
    font-weight: 500;
`

const Button = styled.button`
    max-width: 30%;
    min-width: 18%;
    padding: 12px 7px;
    margin:20px;
    font-weight: 600;
    text-transform: uppercase;
    border: none;
    border-radius: 44px;
    outline: 0;
    cursor: pointer;
    margin-top: 0.5rem;
    margin-Bottom: 1.5rem;
    transition: all 0.3s ease-out;
    background: #75B2B2;
    color: #FFFFFF;
`
const VoteButton = styled.button`
    max-width: 30%;
    min-width: 18%;
    padding: 12px 7px;
    margin:20px;
    font-weight: 600;
    text-transform: uppercase;
    border: none;
    border-radius: 44px;
    outline: 0;
    cursor: pointer;
    margin-top: 0.5rem;
    margin-Bottom: 1.5rem;
    transition: all 0.3s ease-out;
    background:#FFFFFF;
    color:black;
    background: ${props => props.status ? "#75B2B2" : "#FFFFFF"};
    color: ${props => props.status ? "#FFFFFF" : "black"};
    `
const VerifiedBadge = styled.img`
    height: 30px;
`


export const Post = (props) => {

    const [profilePicture, setProfilePicture] = useState()
    const [Imgs, setImgs] = useState([])
    const [popup, setPopup] = useState()
    const [isVoteDirty, setIsVoteDirty] = useState(true)
    // const [voted, setVoted] = useState('')
    const [upVoted, setUpVoted] = useState(false)
    const [downVoted, setDownVoted] = useState(false)
    const [willClose, setWillClose] = useState(false)
    const BoxId = props.post._id + "Box"

    useEffect(async () => {
        const data = {
            picture_link: props.post.picture_link
        }
        axios.post(process.env.REACT_APP_NODE_ENDPOINT+`/post/showPostImage`, data)
            // axios.post('https://leash-khakai-api.herokuapp.com/post/showPostImage', data)
            .then(res => {
                setImgs(res.data.src);
            })
        if (isVoteDirty) {
            await axios.get(process.env.REACT_APP_NODE_ENDPOINT+`/interaction/showInteraction/${props.post._id}`, {
                headers: { 'x-access-token': localStorage.getItem('token') }
            }).then((res) => {
                // console.log(res.data.interaction)
                if (res.data.interaction === "upvote") {
                    setDownVoted(false)
                    setUpVoted(true)
                    setIsVoteDirty(false)
                } else if (res.data.interaction === "downvote") {
                    setUpVoted(false)
                    setDownVoted(true)
                    setIsVoteDirty(false)
                } else {
                    setDownVoted(false)
                    setUpVoted(false)
                    setIsVoteDirty(false)
                }
            })
        }

        if (props.post.owner.profile_picture) {
            axios.get(process.env.REACT_APP_NODE_ENDPOINT+`/auth/showProfileImage/${props.post.owner.profile_picture}`, {
                headers: { 'x-access-token': localStorage.getItem('token') }
            })
                .then((res) => {
                    setProfilePicture(res.data.profile_src)
                })
        }

        if (willClose) {
            setPopup()
            setWillClose(false)
        }

    }, [isVoteDirty, props.post.picture_link, willClose])

    const ShowPopup = () => {
        const post = props.post
        post.src = Imgs
        setPopup(<PopUp props={post} setWillClose={setWillClose} />)
    }

    function fetchPost() {
        axios.get(process.env.REACT_APP_NODE_ENDPOINT+`/feed/${props.post._id}`, {
            headers: { 'x-access-token': localStorage.getItem('token') }
        }).then((res) => {
            // console.log(res.data)
            props.post.upvote = res.data.upvote
            props.post.downvote = res.data.downvote
        })
    }

    function upvote() {
        axios.post(process.env.REACT_APP_NODE_ENDPOINT+`/interaction/upvote`, {
            post_id: props.post._id,
            tags: props.post.tags
        },
            {
                headers: { 'x-access-token': localStorage.getItem('token') }
            }).then((res) => {
                // console.log(res.data)
                setIsVoteDirty(true)
                fetchPost()
            })
    }

    function downvote() {
        axios.post(process.env.REACT_APP_NODE_ENDPOINT+`/interaction/downvote`, {
            post_id: props.post._id,
            tags: props.post.tags
        },
            {
                headers: { 'x-access-token': localStorage.getItem('token') }
            }).then((res) => {
                console.log(res.data)
                setIsVoteDirty(true)
                fetchPost()
            })
    }

    function isVerified(approval_status) {
        if (approval_status === "approved") {
            return <VerifiedBadge src="./Verified.png" />
        }
    }

    // function allTags(tags) {
    //     return (
    //         for (const x of tags){
    //             <TagBox>{x}</TagBox>
    //         }
    //     )
    // }
    const id = "toprofile" + props.post._id
    
    async function goToProfile() {
        return document.getElementById(id).click()
    }

    return (
        <div>
            {popup}
            <Box id={BoxId}>
                <Spacebetween>
                    <PostOwner>
                        <PostOwnerImg src={profilePicture} onClick={() => goToProfile()} />
                        <OwnerName onClick={() => goToProfile()}>{props.post.owner.firstname} {props.post.owner.lastname} {isVerified(props.post.owner.approval_status)}
                        </OwnerName>
                    </PostOwner>
                    <Button onClick={() => ShowPopup()}>OPEN POST</Button>
                </Spacebetween>
                <TextBox>{props.post.post_text}</TextBox>
                <PictureLayout>
                    {
                        Imgs.map((img, i) => {
                            return (
                                <PostImg key={i} className="img" src={img}></PostImg>
                            )
                        })
                    }
                </PictureLayout>
                <FlexStart>
                    {
                        props.post.tags.map((tag, i) => {
                            return (
                                <TagBox key={i}>{tag}</TagBox>
                            )
                        })
                    }
                </FlexStart>
                <div>
                    <Spacearound>
                        <VoteButton status={upVoted} onClick={() => { upvote() }}>UPVOTE {props.post.upvote}</VoteButton>
                        <VoteButton status={downVoted} onClick={() => { downvote() }}>DOWNVOTE {props.post.downvote}</VoteButton>
                    </Spacearound>
                </div>
            </Box>
            <Link id={id} to={{ pathname: `/profile`, owner_id: props.post.owner_id }}></Link>
        </div>
    )
}

export default Post