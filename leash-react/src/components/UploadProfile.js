import React, { useState } from 'react'
import axios from 'axios'
import TokenValidate from '../config/TokenValidate'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Title = styled.h1`
    color:white;
`

const Container = styled.div`
    text-align: center;
    margin-top: 5em;
`

const Picture = styled.img`
    max-height: 350px;
    border-radius: 5%;
    padding: 5px;
`

const Button = styled.button`
    max-width: 50%;
    padding: 11px 20px;
    color: #FFFFFF;
    color: ${(props) => props.textColor};
    background: #A1D3CD;
    background: ${(props) => props.backgroundColor};
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border: none;
    border-radius: 44px;
    cursor: pointer;
    margin: 0.25rem;
`

export const UploadProfile = () => {

    const [uploadedpics, setUploadedpics] = useState()
    const [shower, setShower] = useState()

    function onDrop(selectedImage) {
        //pictures.map(image => {
        let formData = new FormData()
        formData.append("image", selectedImage, selectedImage)
        // console.log(formData)
        axios.post(process.env.REACT_APP_NODE_ENDPOINT+`/auth/uploadProfileImage`, formData)
            .then(res => {
                setShower(res.data.src)
                setUploadedpics(res.data.picture_link)
            })
    }

    function removeSelectedImage(key) {
        axios.post(process.env.REACT_APP_NODE_ENDPOINT+`/auth/removeSelectedImage/${key}`)
            .then(res => {
                setUploadedpics()
                setShower()
            })
    }

    function done() {
        if(uploadedpics){
            const data = {
                profile_picture:uploadedpics
            }
            axios.post(process.env.REACT_APP_NODE_ENDPOINT+`/auth/saveProfilePicture`, data,{
                headers:{'x-access-token':localStorage.getItem('token')}
            })
            .then((res)=>{
                document.getElementById("tofeed").click()
                // window.location.href = "http://localhost:3000/"
            }).catch((error)=> {console.log(error)})
        }else{
            document.getElementById("tofeed").click()
            // window.location.href = "http://localhost:3000/"
        }
        
    }

    return (
        <Container>
            <Title>Choose Picture Profile</Title>
            <input
                type="file"
                id="selectedFile"
                onChange={(event) => {
                    onDrop(event.target.files[0])
                }}
                style={{ display: 'none' }}
            />
            <div>
                {
                    // shower.map((shwr, i) => {
                    //     return <>
                    //         <img key={i} src={shwr} alt={shower.indexOf(shwr)} />
                    //         <button onClick={() => removeSelectedImage(shower.indexOf(shwr))} >Remove</button>
                    //     </>
                    // }
                    // )
                    <Picture id={shower} src={shower} alt={shower} />
                }
            </div>
            <div>
                <Button onClick={() => { document.getElementById('selectedFile').click(); }}>Pick File</Button>
                {
                    shower ? <Button textColor="white" backgroundColor="#FF7272" onClick={() => removeSelectedImage(uploadedpics)} >Remove</Button> : ""
                }
            </div>
            <Button onClick={done}>Done</Button>
            <Link id="tofeed" to="/"></Link>
            {/* <button onClick={uploadImages}>Upload Images</button> */}
        </Container>
    )
            }
export default UploadProfile