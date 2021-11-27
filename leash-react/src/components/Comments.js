import React, { useState, useEffect, Component } from 'react'
import styled, { css } from 'styled-components'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Button = styled.button`

`
const Text = styled.div`
    
`
const ProfileImg = styled.img`
    transform: translateX(-50px);
    border-radius: 50%;
    border: 1px solid #18191A;
    width: 50px;
    height: 50px;
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
const VerifiedBadge = styled.img`
    height: 30px;
`

export const Comments = (props) => {

    const [src, setSrc] = useState()

    useEffect(() => {
        axios.get(process.env.REACT_APP_NODE_ENDPOINT+`/auth/showProfileImage/${props.comment.owner.profile_picture}`, {
            headers: { 'x-access-token': localStorage.getItem('token') }
        })
            .then((res) => {
                setSrc(res.data.profile_src)
            })
    }, [])

    function isVerified(approval_status) {
        if (approval_status === "approved") {
            return <VerifiedBadge src="./Verified.png" />
        }
    }

    return (
        <CommentBox>
            <ProfileImg src={src} />
            {
                console.log(props)
            }
            <div>{props.comment.owner.firstname} {props.comment.owner.lastname} {isVerified(props.comment.owner.approval_status)}</div>
            <div>{props.comment.comment_text}</div>
        </CommentBox>
    )
}

export default Comments