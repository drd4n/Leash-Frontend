import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Post from './Post'
import PopUp from './PopUp'
import TokenValidate from '../config/TokenValidate'
import { Link } from 'react-router-dom'

export const Feed = ({ willFetch, setWillFetch }) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (willFetch) {// const feed = await axios('http://localhost:3001/post', );
            // axios('https://leash-khakai-api.herokuapp.com/')
            // axios('http://localhost:3001')
            axios('http://18.141.13.205:3001')
                // setPosts(feed.data)
                .then(res => {
                    setPosts(res.data)
                    console.log(res.data)
                    setWillFetch(false)
                }).catch((error) => {
                    console.log(error)
                })
        }
    }, [willFetch,setWillFetch])

    return (
        <div>
            {
                posts.slice(0).reverse().map((post, i) => {
                    return <Post key={i} post={post} />
                })

            }
        </div>
    )
}

export default Feed