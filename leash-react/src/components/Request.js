import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import TokenValidate from '../config/TokenValidate'

const VerifyContainer = styled.div`
    display: flex;
    text-align: center;
    justify-content: center;
`
const Text = styled.h3`
    color:white;
`
const Picture = styled.img`
    max-height: 300px;
    border-radius: 5%;
    padding: 5px;
`
const Show = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.3);
    width: 210px;
    height: 350px;
`
const Box = styled.div`
    margin: 1em;
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
    margin: 0.5rem;
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
            await axios.get(process.env.REACT_APP_NODE_ENDPOINT+`/auth/whoAmI`, {
                headers: { 'x-access-token': localStorage.getItem('token') }
            }).then((res) => {
                setProfile(res.data)
                setIsDirty(false)
            })
        }

        if (profile.verify_picture && profile.veterinarian_file) {
            await axios.get(process.env.REACT_APP_NODE_ENDPOINT+`/request/showPendingVerifyPicture/${profile.verify_picture}`, {
                headers: { 'x-access-token': localStorage.getItem('token') }
            }).then(res => {
                setSrc(res.data.verify_picture)
                setRequestPicture(profile.verify_picture)
            })

            axios.get(process.env.REACT_APP_NODE_ENDPOINT+`/request/showPendingFile/${profile.veterinarian_file}`, {
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
        // console.log(formData)
        axios.post(process.env.REACT_APP_NODE_ENDPOINT+`/request/uploadFile`, formData, {
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
        // console.log(formData)
        axios.post(process.env.REACT_APP_NODE_ENDPOINT+`/request/uploadVerifyPicture`, formData, {
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
        // console.log(requestPicture)
        // console.log(requestFile)
        // alert("You CANNOT be able to edit or replace file later.")
        axios.post(process.env.REACT_APP_NODE_ENDPOINT+`/request/submit`,
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
        axios.post(process.env.REACT_APP_NODE_ENDPOINT+`/request/removeSelectedFile`
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
        axios.post(process.env.REACT_APP_NODE_ENDPOINT+`/request/removeSelectedPicture`
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

        axios.post(process.env.REACT_APP_NODE_ENDPOINT+`/request/cancel`, {
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

    function statusButton(approval_status){
        if(approval_status==="pending"){
            return <div>
                <VerifyContainer>
                <Text>Status:{profile.approval_status}</Text>
                </VerifyContainer>
                <VerifyContainer>
                    <Button onClick={() => { cancel() }}>Cancel Submition</Button>
                </VerifyContainer>
            </div>
        }else if(approval_status==="approved"){
            return <div>
                <VerifyContainer>
                <Text>Status:{profile.approval_status}</Text>
                </VerifyContainer>
            </div>
        }else{
            return <VerifyContainer>
                    <Button onClick={() => submit()}>Submit</Button>
                </VerifyContainer>
        }
    }

    return (
        <>
        <div>
            <Button onClick={() => { document.getElementById("toprofile").click() }}>&lt; Profile </Button>
        </div>
        <VerifyContainer>
            <Box>
            <Text>Verified File</Text>
                <Show>
                    <embed src={file} type="application/pdf" height="100%" width="100%" ></embed>
                </Show>
                <input
                    type="file"
                    id="selectedFile"
                    onChange={(event) => {
                        onDrop(event.target.files[0])
                    }}
                    style={{ display: 'none' }}
                />
                <Button onClick={() => { pickFile() }}>Pick File</Button>
                <Button onClick={() => { removeFile() }}>Remove</Button>
            </Box>
            <Box>
                <Text>Verified Picture</Text>
                <Show>
                    <Picture src={src}></Picture>
                </Show>
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
            </Box>
        </VerifyContainer>
        {statusButton(profile.approval_status)}
            <Link id="toprofile" to={{ pathname: "/profile", owner_id: profile._id }}></Link>
            <Link id="notoken" to="/"></Link>
        </>
    )
}

export default Profile