import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import TokenValidate from '../config/TokenValidate'

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
    const [profile, setProfile] = useState({})
    const [file, setFile] = useState()
    const [src, setSrc] = useState()
    const [requestFile, setRequestFile] = useState()
    const [requestPicture, setRequestPicture] = useState()
    const [isDirty, setIsDirty] = useState(true)

    useEffect(async () => {
        if (!TokenValidate()) {
            return document.getElementById("notoken").click()
        }

        if (isDirty) {
            await axios.get('http://localhost:3001/auth/whoAmI', {
                headers: { 'x-access-token': localStorage.getItem('token') }
            }).then((res) => {
                setProfile(res.data)
                setIsDirty(false)
            })
        }

        if (profile.verify_picture && profile.veterinarian_file) {
            await axios.get(`http://localhost:3001/request/showPendingVerifyPicture/${profile.verify_picture}`, {
                headers: { 'x-access-token': localStorage.getItem('token') }
            }).then(res => {
                setSrc(res.data.verify_picture)
                setRequestPicture(profile.verify_picture)
            })

            axios.get(`http://localhost:3001/request/showPendingFile/${profile.veterinarian_file}`, {
                headers: { 'x-access-token': localStorage.getItem('token') }
            }).then(res => {
                setFile(res.data.veterinarian_file)
                setRequestFile(profile.veterinarian_file)
            })
        } else {
            setFile()
            setSrc()
            setRequestFile()
            setRequestPicture()
        }

    }, [isDirty])

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
                setRequestFile(res.data.veterinarian_file)
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
                setRequestPicture(res.data.verify_picture)
                // setShower(res.data.src)
                // setUploadedpics(res.data.picture_link)
            })
    }

    const submit = () => {
        if (!requestPicture || !requestFile || requestPicture === "" || requestFile === "") {
            alert("please complete the form before submit")
            return
        }
        console.log(requestPicture)
        console.log(requestFile)
        // alert("You CANNOT be able to edit or replace file later.")
        axios.post("http://localhost:3001/request/submit",
            {
                filter: {
                    _id: profile._id
                },
                update: {
                    veterinarian_file: requestFile,
                    verify_picture: requestPicture,
                    approval_status: "pending"
                }

            },
            {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            }
        ).then((res) => {
            setSrc("")
            setFile("")
            setRequestFile("")
            setRequestPicture("")
            setIsDirty(true)
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
        if (!file || !requestFile) {
            alert("you did not upload any file yet.")
            return
        }
        axios.post("http://localhost:3001/request/removeSelectedFile"
            , {
                s3key: requestFile
            },
            {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            }).then((res) => {
                setFile()
                setRequestFile()
            })
    }

    const removePicture = () => {
        if (!src || !requestPicture) {
            alert("you did not upload any file yet.")
            return
        }
        axios.post("http://localhost:3001/request/removeSelectedPicture"
            , {
                s3key: requestPicture
            },
            {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            }).then((res) => {
                setSrc()
                setRequestPicture()
            })
    }

    const cancel = () => {
        if (!src && !file && !requestPicture && !requestFile) {
            alert("you did not upload any file yet.")
            return
        }

        axios.post("http://localhost:3001/request/cancel", {
            veterinarian_file: requestFile,
            verify_picture: requestPicture
        },
            {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            }).then((res) => {
                setIsDirty(true)
            })
    }

    return (
        <>
            <Button onClick={() => { document.getElementById("toprofile").click() }}>&lt; Profile </Button>
            <Username>{profile.approval_status}</Username>
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
            <Button onClick={() => { cancel() }}>Cancel Submition</Button>
            <Link id="toprofile" to={{ pathname: "/profile", owner_id: profile._id }}></Link>
            <Link id="notoken" to="/"></Link>
        </>
    )
}

export default Profile