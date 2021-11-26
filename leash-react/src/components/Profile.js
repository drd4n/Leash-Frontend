import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router'
import styled, { keyframes, createGlobalStyle, css } from 'styled-components'
import { Link } from 'react-router-dom'
import TokenValidate from '../config/TokenValidate'
import Post from './Post'

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
    const owner_id = location.owner_id
    const [src, setSrc] = useState("")
    const [profile, setProfile] = useState({})
    const [posts, setPosts] = useState([])
    const [isDirty, setIsDirty] = useState(true)

    const fetchProfile = async () => {
        try {
            const data = await axios.get(`http://localhost:3001/auth/profile/${owner_id}`, {
                headers: { 'x-access-token': localStorage.getItem('token') }
            })
                
            setProfile(data.data)

            axios.get(`http://localhost:3001/auth/showProfileImage/${data.data.profile_picture}`, {
                headers: { 'x-access-token': localStorage.getItem('token') }
            }).then(function(res) {
                setSrc(res.data.profile_src)
            })

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchProfile()

        axios.get(`http://localhost:3001/feed/profile/${owner_id}`, {
            headers: { 'x-access-token': localStorage.getItem('token') }
        }).then((res) => {
            // console.log(res.data)
            setPosts(res.data)
        })
    }, [])

    const toRequest = async () => {
        axios.get('http://localhost:3001/request/check', {
            headers: { 'x-access-token': localStorage.getItem('token') }
        }
        ).then((res) => {
            if (res.data.message === "go") {
                return document.getElementById("torequest").click()
            } else {
                return alert("You are verified veterinarian")
            }
        })
    }

    return (
        <>
            <ProfileRow>
                <Row>
                    <Button onClick={() => document.getElementById("tofeed").click()} >&lt; Feed</Button>
                    <ProfileImg src={src} />
                    <div>
                        <Name>{profile.firstname} {profile.lastname} </Name> <Username>{profile.username}</Username>
                    </div>
                </Row>
                <Button onClick={() => toRequest()}>Request Verifucation</Button>
            </ProfileRow>
            <Link id="torequest" to={{ pathname: "/request", profile: profile }}></Link>
            <Link id="tofeed" to="/"></Link>
            <div>
                {
                    posts.length !== 0 ? posts.slice(0).reverse().map((post, i) => {
                        return <Post key={i} post={post} />
                    })
                    : ''
                }
            </div>
        </>
    )
}

export default Profile