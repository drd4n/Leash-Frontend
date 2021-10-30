import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router'
import styled, { keyframes, createGlobalStyle, css } from 'styled-components'
import { Link } from 'react-router-dom'

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
        axios.get(`https://54.169.181.65/auth/showProfileImage/${profile.profile_picture}`, {
            headers: { 'x-access-token': localStorage.getItem('token') }
        })
            .then((res) => {
                setSrc(res.data.profile_src)
            })

    }, [])

    // const base64toBlob = (data) => {
    //     // Cut the prefix `data:application/pdf;base64` from the raw base 64
    //     const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);

    //     const bytes = window.atob(base64WithoutPrefix);
    //     let length = bytes.length;
    //     let out = new Uint8Array(length);

    //     while (length--) {
    //         out[length] = bytes.charCodeAt(length);
    //     }

    //     return new Blob([out], { type: 'application/pdf' });
    // }

    return (
        <>
            <ProfileRow>
                <Row>
                    <Button onClick={() => document.getElementById("tofeed").click()} >&lt; Feed</Button>
                    <ProfileImg src={src} />
                    <div><Name>{profile.firstname} {profile.lastname} </Name> <Username>{profile.username}</Username>
                    </div>
                    {
                        console.log({ src })
                    }
                </Row>
                <Button onClick={() => {document.getElementById("torequest").click()}}>Request Verifucation</Button>
            </ProfileRow>
            <Link id="torequest" to={{ pathname: "/request", profile: profile }}></Link>
            <Link id="tofeed" to="/"></Link>
        </>
    )
}

export default Profile