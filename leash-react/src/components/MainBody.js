import React, { useState, useEffect } from 'react'
import Feed from './Feed'
import Navbar from './Navbar'
import PostForm from './PostForm'

export const MainBody = () => {

    const [willFetch, setWillFetch] = useState(true)
    console.log(willFetch)
    return (
        <>
            <Navbar setWillFetch={setWillFetch} />
            <PostForm setWillFetch={setWillFetch} />
            <Feed willFetch={willFetch} setWillFetch={setWillFetch} />
        </>
    )
}

export default MainBody