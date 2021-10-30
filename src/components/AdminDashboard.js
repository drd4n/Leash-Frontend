import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AdminTokenValidate from '../config/AdminTokenValidate'
import { Link } from 'react-router-dom'

export const AdminDashboard = () => {

    useEffect(()=>{
        if(!AdminTokenValidate()){
            return document.getElementById("adminnotloggedin").click()
        }
    },[])

    return (
        <div>
            AdminDashboard
            <Link id="adminnotloggedin" to="/admin"></Link>
        </div>
    )
}

export default AdminDashboard