import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AdminTokenValidate from '../config/AdminTokenValidate'
import { Link } from 'react-router-dom'

export const AdminDashboard = () => {

    const [requests, setRequests] = useState([])
    const [isDirty, setIsDirty] = useState(true)

    useEffect(() => {
        if (!AdminTokenValidate()) {
            return document.getElementById("adminnotloggedin").click()
        }

        axios.get('http://localhost:3001/request/allRequests', {
            headers: { 'x-access-token': localStorage.getItem('admintoken') }
        }).then((res) => {
            setRequests(res.data)
            setIsDirty(false)
        })
    }, [isDirty])

    const base64toBlob = (data, b64Type) => {
        // Cut the prefix `data:application/pdf;base64` from the raw base 64
        const base64Type = "data:"+b64Type+";base64,"
        const base64WithoutPrefix = data.substr( base64Type.length);
    
        const bytes = window.atob(base64WithoutPrefix);
        let length = bytes.length;
        let out = new Uint8Array(length);
    
        while (length--) {
            out[length] = bytes.charCodeAt(length);
        }
    
        return new Blob([out], { type: b64Type });
    }

    const showProfile = (s3key) => {
        axios.get(`http://localhost:3001/request/showProfileImage/${s3key}`, {
            headers: { 'x-access-token': localStorage.getItem('admintoken') }
        })
        .then( res => {
            // let image = new Image();
            // image.src = res.data.profile_src
            // return window.open("_blank").document.write(image.outerHTML)
            const url = URL.createObjectURL(base64toBlob(res.data.profile_src, "image/jpg"))
            return window.open(url, "_blank")
        })
    }

    const showVerifyPicture = (s3key) => {
        axios.get(`http://localhost:3001/request/showVerifyPicture/${s3key}`, {
            headers: { 'x-access-token': localStorage.getItem('admintoken') }
        })
        .then( res => {
            // image/jpg
            const url = URL.createObjectURL(base64toBlob(res.data.verify_picture, "image/jpg"))
            return window.open(url, "_blank")
        })
    }

    const showFile = (s3key) => {
        axios.get(`http://localhost:3001/request/showFile/${s3key}`, {
            headers: { 'x-access-token': localStorage.getItem('admintoken') }
        })
        .then( res => {
            const blob = base64toBlob(res.data.veterinarian_file, "application/pdf");
            const url = URL.createObjectURL(blob);
            return window.open(url,"_blank")
        })
    }

    const approve = (user_id) => {
        axios.post(`http://localhost:3001/request/approve`, {user_id},{
            headers: { 'x-access-token': localStorage.getItem('admintoken') }
        })
        .then( res => {
            setIsDirty(true)
        })
    } 

    const reject = (user_id,veterinarian_file,verify_picture) => {
        axios.post(`http://localhost:3001/request/reject`, {user_id,veterinarian_file,verify_picture},{
            headers: { 'x-access-token': localStorage.getItem('admintoken') }
        })
        .then( res => {
            setIsDirty(true)
        })
    } 

    return (
        <div>
            AdminDashboard
            <table style={{ border: "1px solid white", color: "white" }}>
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>E-mail</th>
                    <th>Dob</th>
                    <th>profile picture</th>
                    <th>verify picture</th>
                    <th>veterinarian file</th>
                </tr>
                {
                    requests.map(request => {
                        return <tr>
                                    <td>{request.firstname} {request.lastname}</td>
                                    <td>{request.username}</td>
                                    <td>{request.email}</td>
                                    <td>{request.dob.slice(0,10)}</td>
                                    <td><button onClick={()=>{showProfile(request.profile_picture)}}>View Profile Picture</button></td>
                                    <td><button onClick={()=>{showVerifyPicture(request.verify_picture)}}>View Verification Picture</button></td>
                                    <td><button onClick={()=>{showFile(request.veterinarian_file)}}>View Verification File</button></td>
                                    <td><button onClick={()=>{ approve(request._id) }}>Approve</button></td>
                                    <td><button onClick={()=>{ reject(request._id,request.veterinarian_file,request.verify_picture) }}>Reject</button></td>
                                    <td>{request.approval_status}</td>
                                </tr>
                    })
                }
            </table>
            <Link id="adminnotloggedin" to="/admin"></Link>
        </div>
    )
}

export default AdminDashboard