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
    margin-top: 20px;
    background-color: #242526;
    display: flex;
    flex-direction: column;
    position: center;
    margin: auto;
    margin-top: 20px;
  `
const PostOwnerImg = styled.img`
    transform: translateX(-50px);
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 1px solid #18191A;
    margin-left: -50px;
`
const PostOwner = styled.div`
    display: flex;
    color: #FFFFFF;
    font-size: 30px;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    justify-content: flex-start;
  `

const OwnerName = styled.div`
    color: #FFFFFF;
    font-size: 24px;
    font-weight: 550;
    letter-spacing: 0.5px;
    height: 20px;
    width: 430px;
    margin-left: -42px;
    margin-bottom: 10px;
    justify-content: flex-start;
    align-items: center;
`
const PostImg = styled.img`
    max-height: 250px;
    border-radius: 5%;
    padding: 5px;
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

const Spacearound = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`
const FlexStart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 5px;
  margin-left: 2px;
`

const Center = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 5px;
  margin-top: -8px;
`

const TagBox = styled.div`
    color: #75B2B2;
    border-radius: 35px;
    font-size: 13px;
    font-weight: 100;
    letter-spacing: 1px;
    display: inline-block;
    margin: 3px;
    padding: 0.3em 1.1em;
    border: 1.5px solid #75B2B2;
    display: block;
    margin-bottom: 20px;
`

const Button = styled.button`
    display: inline-block;
    height: 50px;
    width: 100px;
    padding: 8px;
    margin: 15px;
    font-weight: 600;
    text-transform: uppercase;
    border: none;
    border-radius: 44px;
    cursor: pointer;
    margin-right: -3.2rem;
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
    height: 20px;
    width: 20px;
    padding: 2px;
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
                <Spacearound>
                    <PostOwner>
                        <PostOwnerImg src={profilePicture} onClick={() => goToProfile()} />
                        <OwnerName onClick={() => goToProfile()}>{props.post.owner.firstname} {props.post.owner.lastname} {isVerified(props.post.owner.approval_status)}
                        </OwnerName>
                        <Button onClick={() => ShowPopup()}>OPEN POST</Button>
                    </PostOwner>
                    
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
                <TextBox>{props.post.post_text}</TextBox>
                <Center>
                    {
                        props.post.tags.map((tag, i) => {
                            return (
                                <TagBox key={i}>{tag}</TagBox>
                            )
                        })
                    }
                </Center>
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