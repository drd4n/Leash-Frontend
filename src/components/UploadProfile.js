import React, { useState } from 'react'
import axios from 'axios'
import TokenValidate from '../config/TokenValidate'

export const UploadProfile = () => {

    const [uploadedpics, setUploadedpics] = useState()
    const [shower, setShower] = useState()

    function onDrop(selectedImage) {
        //pictures.map(image => {
        let formData = new FormData()
        formData.append("image", selectedImage, selectedImage)
        console.log(formData)
        axios.post('http://localhost:3001/auth/uploadProfileImage', formData)
            .then(res => {
                setShower(res.data.src)
                setUploadedpics(res.data.picture_link)
            })
    }

    function removeSelectedImage(key) {
        axios.post(`http://localhost:3001/auth/removeSelectedImage/${key}`)
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
            axios.post('http://localhost:3001/saveProfilePicture', data)
            .then((res)=>{
                window.location.href = "http://localhost:3000/feed"
            }).catch((error)=> {console.log(error)})
        }else{
            window.location.href = "http://localhost:3000/feed"
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
            {/* <button onClick={uploadImages}>Upload Images</button> */}
        </>
    )
            }
export default UploadProfile