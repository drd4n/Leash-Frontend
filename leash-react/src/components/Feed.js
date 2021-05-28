import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Post from './Post'

export const Feed = ({ willFetch, setWillFetch }) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (willFetch) {// const feed = await axios('http://localhost:3001/post', );
            axios('http://localhost:3001/feed')
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