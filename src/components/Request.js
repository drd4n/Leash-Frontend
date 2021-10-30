import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
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
    const [file, setFile] = useState("")

    function onDrop(selectedImage) {
        //pictures.map(image => {
        let formData = new FormData()
        formData.append("image", selectedImage, selectedImage)
        console.log(formData)
        axios.post('http://localhost:3001/request/uploadFile', formData,{
            headers:{'x-access-token':localStorage.getItem('token')}
        })
            .then(res => {
                console.log(res.data.file)
                // const blob = base64toBlob(res.data.file);
                // setFile(URL.createObjectURL(blob))
                setFile(res.data.file)
                // setShower(res.data.src)
                // setUploadedpics(res.data.picture_link)
            })
    }

    const submit = () => {
        alert("You CANNOT be able to edit or replace file later.")
    }

    const pickFile = () => {
        if(file){
            alert("please delete previous file before reupload")
            return
        }
        document.getElementById('selectedFile').click();
    }

    return (
        <>
        <Button onClick={() => {document.getElementById("toprofile").click()}}>&lt; Profile </Button>
        <Username>Verified File</Username>
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.3)', height: '255px', width:'210px' }}>
                <embed src={file} type="application/pdf" height="100%" width="100%" ></embed>
            </div>
            <input
                type="file"
                id="selectedFile"
                onChange={(event) => {
                    onDrop(event.target.files[0])
                }}
                style={{ display: 'none' }}
            />
            <Button onClick={() => { pickFile() }}>Pick File</Button>
            <Button onClick={() => submit()}>Submit</Button>
            <Link id="toprofile" to={{ pathname: "/profile", profile: profile }}></Link>
        </>
    )
}

export default Profile