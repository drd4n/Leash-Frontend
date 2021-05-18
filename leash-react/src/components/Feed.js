import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const Feed = () => {
    const [posts, setPosts] = useState([])

// useEffect( () => {
//         // const feed = await axios('http://localhost:3001/post', );
//          axios('http://localhost:3001/post')
//         // setPosts(feed.data)
//         .then(res => {
//             setPosts(res.data)
//             console.log(res.data)
//         }).catch((error) => {
//             console.log(error)
//         })
// },[])
    
    return ( 
        <div>
            {
                posts.map((post,i) => {
                    return <p key={i}>{post.post_text}</p>
                })
            }
        </div>
    )
}

export default Feed