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
    const [src, setSrc] = useState("")
    const [request, setRequest] = useState({})

    function onDrop(selectedImage) {
        //pictures.map(image => {
        let formData = new FormData()
        formData.append("file", selectedImage, selectedImage)
        console.log(formData)
        axios.post('http://localhost:3001/request/uploadFile', formData, {
            headers: { 'x-access-token': localStorage.getItem('token') }
        })
            .then(res => {
                // const blob = base64toBlob(res.data.file);
                // setFile(URL.createObjectURL(blob))
                setFile(res.data.file)
                setRequest({ ...request, veterinarian_file: res.data.veterinarian_file })
                // setShower(res.data.src)
                // setUploadedpics(res.data.picture_link)
            })
    }

    function onDropPicture(selectedImage) {
        //pictures.map(image => {
        let formData = new FormData()
        formData.append("image", selectedImage, selectedImage)
        console.log(formData)
        axios.post('http://localhost:3001/request/uploadVerifyPicture', formData, {
            headers: { 'x-access-token': localStorage.getItem('token') }
        })
            .then(res => {
                // const blob = base64toBlob(res.data.file);
                // setFile(URL.createObjectURL(blob))
                setSrc(res.data.src)
                setRequest({ ...request, verify_picture: res.data.verify_picture })
                // setShower(res.data.src)
                // setUploadedpics(res.data.picture_link)
            })
    }

    const submit = () => {
        if (!request.verify_picture && !request.veterinarian_file) {
            alert("please complete the form before submit")
            return
        }
        // alert("You CANNOT be able to edit or replace file later.")
        axios.post("http://localhost:3001/request/submit",
            {
                filter: {
                    _id: profile._id
                },
                update: {
                    veterinarian_file: request.veterinarian_file,
                    verify_picture: request.verify_picture
                }

            },
            {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            }
        ).then( (res) => {
            setSrc("")
            setFile("")
            setRequest({})
            return document.getElementById("toprofile").click()
        })
    }

    const pickFile = () => {
        if (file) {
            alert("please delete previous file before reupload")
            return
        }
        document.getElementById('selectedFile').click();
    }

    const pickPicture = () => {
        if (src) {
            alert("please delete previous file before reupload")
            return
        }
        document.getElementById('selectedPicture').click();
    }

    const removeFile = () => {
        if (!file) {
            alert("you did not upload any file yet.")
            return
        }
        axios.post("http://localhost:3001/request/removeSelectedFile"
            , {
                s3key: request.veterinarian_file
            },
            {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            }).then((res) => {
                setFile("")
                setRequest({ ...request, veterinarian_file: "" })
            })
    }

    const removePicture = () => {
        if (!src) {
            alert("you did not upload any file yet.")
            return
        }
        axios.post("http://localhost:3001/request/removeSelectedPicture"
            , {
                s3key: request.verify_picture
            },
            {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            }).then((res) => {
                setSrc("")
                setRequest({ ...request, verify_picture: "" })
            })
    }

    return (
        <>
            <Button onClick={() => { document.getElementById("toprofile").click() }}>&lt; Profile </Button>
            <Username>Verified File</Username>
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.3)', height: '255px', width: '210px' }}>
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
            <Button onClick={() => { removeFile() }}>Remove</Button><br />
            <Username>Verified Picture</Username>
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.3)', height: '255px', width: '210px' }}>
                <img src={src}></img>
            </div>
            <input
                type="file"
                id="selectedPicture"
                onChange={(event) => {
                    onDropPicture(event.target.files[0])
                }}
                style={{ display: 'none' }}
            />
            <Button onClick={() => { pickPicture() }}>Pick Picture</Button>
            <Button onClick={() => { removePicture() }}>Remove</Button><br />
            <Button onClick={() => submit()}>Submit</Button>
            <Link id="toprofile" to={{ pathname: "/profile", profile: profile }}></Link>
        </>
    )
}

export default Profile