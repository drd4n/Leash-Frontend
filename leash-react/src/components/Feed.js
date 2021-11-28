import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Post from './Post'
import styled, { css } from 'styled-components'


const Flex = styled.div` 
    display: flex;
    position: center;
    justify-content: center;
`

const Container = styled.div` 
    position: center;
    margin-top: 20px;

`


export const Feed = ({ willFetch, setWillFetch }) => {
    const [posts, setPosts] = useState([])
    const [temp, setTemp] = useState([])
    const [isRecommend, setIsRecommend] = useState(false)

    useEffect(async () => {
        if (isRecommend){
            let user_id = ""
            await axios.get(process.env.REACT_APP_NODE_ENDPOINT+`/auth/whoAmI`,{
                headers: {'x-access-token':localStorage.getItem('token')}
            })
            .then(async (res) => {
                user_id = res.data._id
                // console.log(res.data._id)
                await axios.get(process.env.REACT_APP_FLASK_ENDPOINT+`/recommendedPosts?user_id=${user_id}`)
                    .then((res)=>{
                    setPosts([])
                    setPosts(res.data)
                    // console.log(posts)
                    // console.log(res.data)
                })
            })
            
        } 
        
        if (willFetch) {// const feed = await axios('process.env.REACT_APP_NODE_ENDPOINT+/post', );
            // axios('https://leash-khakai-api.herokuapp.com/')
            axios(process.env.REACT_APP_NODE_ENDPOINT)
            // axios('http://18.141.13.205:3001')
                // setPosts(feed.data)
                .then(res => {
                    setTemp([])
                    setPosts([])
                    setPosts(res.data)
                    setWillFetch(false)
                    // console.log(res.data)
                    // console.log("fectch")
                }).catch((error) => {
                    console.log(error)
                })
        }
    }, [isRecommend,willFetch,setWillFetch])



    function recommendPosts(){
            setIsRecommend(true)
            setWillFetch(false)
        }
    function feedPosts(){
            setIsRecommend(false)
            setWillFetch(true)
        }
    // function click() {
    //     console.log(document.getElementById("myCheck").checked)
    //     if (document.getElementById("myCheck").checked){
    //         setIsRecommend(true)
    //     }else{
    //         setIsRecommend(false)
    //     }
    //   }
    // onChange={click()}

    return (

        <Flex>

        <Container>
            <label>
                <button onClick={() => recommendPosts()}>Recommend</button>
                <button onClick={() => feedPosts()}>Feed</button>  
            </label>
        

        
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
        </Container>
        </Flex>
    )
}

export default Feed