import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router'
import styled, { keyframes, createGlobalStyle, css } from 'styled-components'

const Name = styled.h1`
color:white;
`
const Username = styled.h3`
color:white;
`
const ProfileRow = styled.div`
display:flex;
flex-direction: row;
align-items: center;
justify-content:space-evenly;
position: fixed;
width: 100%;
height: 200px;
background: #242526;
`
const Row = styled.div`
display:flex;
flex-direction: row;
height: 200px;
align-items: center;
`

const ProfileImg = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    display:flex;
    margin: 20px;
`
const Button = styled.button`
align-self: center;
position: bottom;
padding: 11px 20px;
font-weight: 600;
letter-spacing: 0.1em;
text-transform: uppercase;
border: none;
border-radius: 44px;
outline: 0;
cursor: pointer;
margin-top: 0.5rem;
margin-Bottom: 1.5rem;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
transition: all 0.3s ease-out;
`

export const Profile = () => {
    const location = useLocation()
    const profile = location.profile
    const [src, setSrc] = useState("")

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/showProfileImage/${profile.profile_picture}`, {
            headers: { 'x-access-token': localStorage.getItem('token') }
        })
        .then((res) => {
            console.log(JSON.stringify(res.data.profile_src))
            setSrc(res.data.profile_src)
        })
    }, [])

    return (
        <ProfileRow>
            <Row>
                <ProfileImg src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'/>
                <div><Name>{profile.firstname} {profile.lastname} </Name> <Username>{profile.username}</Username>
                </div>
            </Row>
            <Button>setting</Button>
        </ProfileRow>
    )
}

export default Profile