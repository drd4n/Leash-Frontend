import axios from 'axios'
import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

export const Navbar = ({setWillFetch}) => {

    const [profile, setProfile] = useState({})

    const whoAmI = async() => {
        try{
            const data = await axios.get('http://localhost:3001/auth/whoAmI',{
                headers: {'x-access-token':localStorage.getItem('token')}
            })
            setProfile(data.data)
            document.getElementById("profile").click()
        }catch(error){
            console.log(error)
        }
        
    }

    const Wrapper = styled.div`
        display: flex;
        position: relative;
    `
    const Sidebar = styled.div`
        width: 250px;
        height: 100%;
        background: #242526;
        padding: 30px 0px;
        position: fixed;
        flex-direction: column;
        display: flex;
        justify-content:space-evenly;
    `
    const Col = styled.div`
        flex-direction: column;
        display: flex;
        /* justify-content:space-evenly; */
    `
    const Button = styled.button`
        background-color: #FFFFFF;
        padding: 7px 12px;
        font-weight: 600;
        border-radius: 15px;
        cursor: pointer;
     `
    const A = styled.button`
        align-self: center;
        width: 170px;
        background: #bdb8d;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin: 0 5px;
        color: black;
        border-radius: 15px;
        margin:10px;
        width:100px;
    `
    
    function logout() {
        // if (!TokenValidate()) {
        //     return alert("session out of date")
        // }
         axios.post("http://localhost:3001/auth/logout", {
                token: localStorage.getItem('token')
            })
            .then((res) => {
                if(res.status === 200){
                    localStorage.clear()
                    return document.getElementById("logout").click()
                }
            })
    }

    return (
        <Wrapper>
            <Sidebar>
            <Col>
                <Button onClick={() => setWillFetch(true)}>Leash</Button>
                <A><Link id="profile" to={{pathname:"/profile", profile:profile}}>UserImage</Link></A>
            </Col>
            <Col>
            <A onClick={() => whoAmI()}>profile</A>
            <A>Setting</A>
            <A onClick={() => logout()}>Logout</A>
            <Link id="logout" to="/login"></Link>
            </Col>
            <Col>
            <Button onClick={() => logout()}>Logout</Button>
            </Col>
            <Link id="logout" to="/login"></Link> 
            </Sidebar>
        </Wrapper>
    )
}

export default Navbar