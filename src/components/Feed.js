import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Post from './Post'

export const Feed = ({ willFetch, setWillFetch }) => {
    const [posts, setPosts] = useState([])
    const [temp, setTemp] = useState([])
    const [isRecommend, setIsRecommend] = useState(false)

    useEffect(() => {
        if (isRecommend){
            let user_id = ""
            axios.get('https://54.169.181.65/auth/whoAmI',{
                headers: {'x-access-token':localStorage.getItem('token')}
            })
            .then((res)=>{
                user_id = res.data._id
                axios.get(`http://127.0.0.1:5000/recommendedPosts?user_id=${user_id}`)
                .then((res)=>{
                setPosts([])
                setTemp(res.data)
            })
            })
            
        } else {
            axios('https://54.169.181.65')
                .then(res => {
                    setTemp([])
                    setPosts([])
                    setPosts(res.data)
                    console.log(res.data)
                    setWillFetch(false)
                }).catch((error) => {
                    console.log(error)
                })
        }
        if (willFetch) {// const feed = await axios('https://54.169.181.65/post', );
            // axios('https://leash-khakai-api.herokuapp.com/')
            axios('https://54.169.181.65')
            // axios('http://18.141.13.205:3001')
                // setPosts(feed.data)
                .then(res => {
                    setTemp([])
                    setPosts([])
                    setPosts(res.data)
                    console.log(res.data)
                    setWillFetch(false)
                }).catch((error) => {
                    console.log(error)
                })
        }
    }, [isRecommend,willFetch,setWillFetch])

    return (
        <div>
            <button onClick={() => {setIsRecommend(!isRecommend)}} >change feed</button>
            {
                temp ? temp.map((inter,i)=>{
                    return <div key={i}>{inter.interactions}</div>
                }) : ""
            }
            {
                posts.length !== 0 ? posts.slice(0).reverse().map((post, i) => {
                    return <Post key={i} post={post} />
                })
                : ''
            }
        </div>
    )
}

export default Feed