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
    margin-left: 50px;
    margin-top: 15px;
  `
const CommentBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 44px;
    margin: 10px;
    padding: 3px;
    background-color: none;
`
const VerifiedBadge = styled.img`
    height: 30px;
`

const OwnerName = styled.div`
    color: #FFFFFF;
    font-size: 16px;
    font-weight: 550;
    height: 20px;
    width: 450px;
    margin-left: -40px;
    margin-top: 20px;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    
`

const CommentName = styled.div`
    display:flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: -18px;
    margin-left: 20px;
`

const TextBox = styled.div`
    font-size: 15px;
    padding: 12px;
    color: white;
    width: 500px;
    border-radius: 25px; 
    margin: auto;
    margin-top: 5px;
    margin-bottom: 12px;
    background-color: #1E1E1E;
    max-width: 490px;
    line-break: anywhere;
`

const Flex = styled.div` 
    display:flex;
    flex-direction: column;
    margin-bottom: -10px;
    margin-top: -10px;
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

        <Flex>

            <CommentName>

                <ProfileImg src={src} />
                    {
                        console.log(props)
                    }
                <OwnerName>{props.comment.owner.firstname} {props.comment.owner.lastname} {isVerified(props.comment.owner.approval_status)}</OwnerName>

            </CommentName>

            <CommentBox>
                
                <TextBox>{props.comment.comment_text}</TextBox>

            </CommentBox>

        </Flex>
    )
}

export default Comments