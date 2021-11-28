import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AdminTokenValidate from '../config/AdminTokenValidate'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Table = styled.table`
    border: 1px solid white;
    color: white;
    border-collapse: collapse;
    margin: 20px auto;
`
const DivRight = styled.div`
    text-align: right;
    margin-top: 30px;
    margin-right: 170px;
`
const Button = styled.button`
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.65;
    filter: alpha(opacity=65);
    -webkit-box-shadow: none;
    box-shadow: none;
`
const Title = styled.h1`
    color: white;
    text-align-last: center;
`
const LogoutButton = styled.button`
    max-width: 100%;
    align-self: center;
    padding: 11px 20px;
    color: #FFFFFF;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: #FF7272;
    border: none;
    border-radius: 44px;
    cursor: pointer;
`
const Td = styled.td`
    padding: 5px;
    border: 1px solid #ccc;
    text-align: center;
`
const Th = styled.th`
    padding: 5px;
    border: 1px solid #ccc;
    text-align: center;
    background: #3A3B3C;
`

export const AdminDashboard = () => {

    const [requests, setRequests] = useState([])
    const [isDirty, setIsDirty] = useState(true)

    useEffect(() => {
        if (!AdminTokenValidate()) {
            return document.getElementById("adminnotloggedin").click()
        }

        axios.get(process.env.REACT_APP_NODE_ENDPOINT+`/request/allRequests`, {
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
        axios.get(process.env.REACT_APP_NODE_ENDPOINT+`/request/showProfileImage/${s3key}`, {
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
        axios.get(process.env.REACT_APP_NODE_ENDPOINT+`/request/showVerifyPicture/${s3key}`, {
            headers: { 'x-access-token': localStorage.getItem('admintoken') }
        })
        .then( res => {
            // image/jpg
            const url = URL.createObjectURL(base64toBlob(res.data.verify_picture, "image/jpg"))
            return window.open(url, "_blank")
        })
    }

    const showFile = (s3key) => {
        axios.get(process.env.REACT_APP_NODE_ENDPOINT+`/request/showFile/${s3key}`, {
            headers: { 'x-access-token': localStorage.getItem('admintoken') }
        })
        .then( res => {
            const blob = base64toBlob(res.data.veterinarian_file, "application/pdf");
            const url = URL.createObjectURL(blob);
            return window.open(url,"_blank")
        })
    }

    const approve = (user_id) => {
        axios.post(process.env.REACT_APP_NODE_ENDPOINT+`/request/approve`, {user_id},{
            headers: { 'x-access-token': localStorage.getItem('admintoken') }
        })
        .then( res => {
            setIsDirty(true)
        })
    } 

    const reject = (user_id,veterinarian_file,verify_picture) => {
        axios.post(process.env.REACT_APP_NODE_ENDPOINT+`/request/reject`, {user_id,veterinarian_file,verify_picture},{
            headers: { 'x-access-token': localStorage.getItem('admintoken') }
        })
        .then( res => {
            setIsDirty(true)
        })
    }

    function showButton(request){
        if(request.approval_status==="pending"){
            return  <div>
                        <Td><button onClick={()=>{ approve(request._id) }}>Approve</button></Td>
                        <Td><button onClick={()=>{ reject(request._id,request.veterinarian_file,request.verify_picture) }}>Reject</button></Td>
                        <Td>Pending</Td>
                    </div>
        }else if(request.approval_status==="approved"){
            return  <div>
                        <Td><Button>Approve</Button></Td>
                        <Td><button onClick={()=>{ reject(request._id,request.veterinarian_file,request.verify_picture) }}>Reject</button></Td>
                        <Td>Approved</Td>
                    </div>
        }
    }

    // function logout() {
    //     axios.post(process.env.REACT_APP_NODE_ENDPOINT+`/auth/adminLogout`,{
    //         headers: { 'x-access-token': localStorage.getItem('admintoken') }
    //     })
    //         .then((res) => {
    //             if (res.status === 200) {
    //                 localStorage.clear()
    //                 return document.getElementById("adminLogout").click()
    //             }
    //         })
    // }

    return (
        <div>
            <Title>AdminDashboard</Title>
            <Table style={{ border: "1px solid white", color: "white" }}>
                <tr>
                    <Th>FullName</Th>
                    <Th>Username</Th>
                    <Th>E-mail</Th>
                    <Th>Dob</Th>
                    <Th>profile picture</Th>
                    <Th>verify picture</Th>
                    <Th>veterinarian file</Th>
                    <Th></Th>
                </tr>
                {
                    requests.map(request => {
                        return <tr>
                                    <Td>{request.firstname} {request.lastname}</Td>
                                    <Td>{request.username}</Td>
                                    <Td>{request.email}</Td>
                                    <Td>{request.dob.slice(0,10)}</Td>
                                    <Td><button onClick={()=>{showProfile(request.profile_picture)}}>View Profile Picture</button></Td>
                                    <Td><button onClick={()=>{showVerifyPicture(request.verify_picture)}}>View Verification Picture</button></Td>
                                    <Td><button onClick={()=>{showFile(request.veterinarian_file)}}>View Verification File</button></Td>
                                    {showButton(request)}
                                </tr>
                    })
                }
            </Table>
            <DivRight>
            <Link id="adminLogout" to="/admin"><LogoutButton>Logout</LogoutButton></Link>
            </DivRight>
            {/* <Link id="adminLogout" to="/admin"></Link> */}
        </div>
    )
}

export default AdminDashboard