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
    display:flex;
`
const PostOwner = styled.div`
    display:flex;
    align-items: center;
    color: #FFFFFF;
    font-size: 30px;
  `

const OwnerName = styled.div`
    margin: 20px;
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
    background: ${props => props.status ? "#75B2B2" : "#FFFFFF" };
    color: ${props => props.status ? "#FFFFFF" : "black" };
    `



export const Post = (props) => {
    
    const [owner, setOwner] = useState({})
    const [profilePicture, setProfilePicture] = useState()
    const [Imgs, setImgs] = useState([])
    const [popup, setPopup] = useState()
    const [isVoteDirty, setIsVoteDirty] = useState(true)
    const [voted, setVoted] = useState('')
    const [upVoted, setUpVoted] = useState(false)
    const [downVoted, setDownVoted] = useState(false)
    const [willClose, setWillClose] = useState(false)
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
        if(isVoteDirty){
            axios.get(`http://localhost:3001/interaction/showInteraction/${props.post._id}`, {
            headers: { 'x-access-token': localStorage.getItem('token') }
        }).then((res) => {
            console.log(res.data.interaction)
            if(res.data.interaction==="upvote"){
                setUpVoted(true)
            }else if(res.data.interaction==="downvote"){
                setDownVoted(true)
            }else{
                setDownVoted(false)
                setUpVoted(false)
            }
        })
        }

        if(props.post.owner.profile_picture){
            axios.get(`http://localhost:3001/auth/showProfileImage/${props.post.owner.profile_picture}`,{
                headers: {'x-access-token':localStorage.getItem('token')}
            })
            .then((res)=>{
                setProfilePicture(res.data.profile_src)
            })
        }

        if(willClose){
            setPopup()
            setWillClose(false)
        }

    }, [props.post.picture_link,willClose,isVoteDirty])

    const ShowPopup = () => {
        const post = props.post
        post.src = Imgs
        setPopup(<PopUp props={post} setWillClose={setWillClose} />)
        // document.getElementById(PopId).style.display = "Block";
        // document.getElementById(BoxId).style.display = "none";
    }

    function upvote() {
        axios.post('http://localhost:3001/interaction/upvote', {
            post_id: props.post._id,
            tags: props.post.tags
        },
            {
                headers: { 'x-access-token': localStorage.getItem('token') }
            }).then((res) => {
                console.log(res.data)
                setIsVoteDirty(true)
            })
    }

    function downvote() {
        axios.post('http://localhost:3001/interaction/downvote', {
            post_id: props.post._id,
            tags: props.post.tags
        },
            {
                headers: { 'x-access-token': localStorage.getItem('token') }
            }).then((res) => {
                console.log(res.data)
                setIsVoteDirty(true)
            })
    }

    async function toProfile() {
        try{
            const data = await axios.get(`http://localhost:3001/auth/profile/${props.post.owner_id}`,{
                headers: {'x-access-token':localStorage.getItem('token')}
            })
            setOwner(data.data)
            return document.getElementById("toProfile").click()
        }catch(error){
            // console.log(error.response.data.errors)
            console.log(error)
        }
    }

    return (
        <div>
            {popup}
            <Box id={BoxId}>
                <Spacebetween>
                    <PostOwner>
                        <PostOwnerImg src={profilePicture} onClick={toProfile}/>
                        <Link id="toProfile" to={{pathname:"/profile", profile:owner}}></Link>
                        <OwnerName>{props.post.owner.firstname} {props.post.owner.lastname}</OwnerName>
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
                <div>
                    <Spacearound>
                        {console.log(downVoted)}
                            <VoteButton status ={upVoted} id="p2" onClick={() => { upvote() }}>UPVOTE</VoteButton>
                            {console.log(upVoted)}
                            <VoteButton status ={downVoted} onClick={() => { downvote() }}>DOWNVOTE</VoteButton>
                    </Spacearound>
                </div>
            </Box>
        </div>
    )
}

export default Post