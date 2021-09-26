import React, { useState } from 'react'
import axios from 'axios'
import TokenValidate from '../config/TokenValidate'
import { Link } from 'react-router-dom'

export const UploadProfile = () => {

    const [uploadedpics, setUploadedpics] = useState()
    const [shower, setShower] = useState()

    function onDrop(selectedImage) {
        //pictures.map(image => {
        let formData = new FormData()
        formData.append("image", selectedImage, selectedImage)
        console.log(formData)
        axios.post('https://54.169.181.65/auth/uploadProfileImage', formData)
            .then(res => {
                setShower(res.data.src)
                setUploadedpics(res.data.picture_link)
            })
    }

    function removeSelectedImage(key) {
        axios.post(`https://54.169.181.65/auth/removeSelectedImage/${key}`)
            .then(res => {
                setUploadedpics()
                setShower()
                console.log(res.data)
            })
    }

    function done() {
        if(uploadedpics){
            const data = {
                profile_picture:uploadedpics
            }
            axios.post('https://54.169.181.65/auth/saveProfilePicture', data,{
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
        <>
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
                    <img id={shower} src={shower} alt={shower} />
                }
                {
                    shower ? <button onClick={() => removeSelectedImage(uploadedpics)} >Remove</button> : ""
                }
            </div>

            <button onClick={() => { document.getElementById('selectedFile').click(); }}>Pick File</button>
            <button onClick={done}>Done</button>
            <Link id="tofeed" to="/"></Link>
            {/* <button onClick={uploadImages}>Upload Images</button> */}
        </>
    )
            }
export default UploadProfile