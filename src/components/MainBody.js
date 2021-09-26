import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TokenValidate from '../config/TokenValidate'
import Feed from './Feed'
import Navbar from './Navbar'
import PostForm from './PostForm'

export const MainBody = () => {

    useEffect(()=>{
        if(!TokenValidate()){
            return document.getElementById("notloggedin").click()
        }
    },[])
    
    const [willFetch, setWillFetch] = useState(true)
    return (
        <>
            <Navbar setWillFetch={setWillFetch} />
            <PostForm setWillFetch={setWillFetch} />
            <Feed willFetch={willFetch} setWillFetch={setWillFetch} />
            <Link id="notloggedin" to="/login"></Link>
        </>
    )
}

export default MainBody