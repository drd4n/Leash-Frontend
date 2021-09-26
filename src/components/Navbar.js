import axios from 'axios'
import React, { useState, useEffect } from 'react'
import styled, { keyframes, createGlobalStyle, css } from 'styled-components'
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

    const jump = keyframes`
        from{
            transform: translateY(0)
        }
        to{
            transform: translateY(-3px)
        }
    `;

    const Container = styled.section`
        display: flex;
        justify-content: left;
        justify-item: center;
        flex-wrap: wrap;
        flex-shrink: 0;
        height: 100%;
        width: 100%;

    `;

    const SidebarItem = styled.div`
        display: flex;
        flex-direction: column;
        position: fixed;
        
        justify-item: center;
        width: 250px;
        height: 100%;
        background: #242526;
    `
    const Button = styled.button`
        max-width: 100%;
        min-width: 50%;
        align-self: center;
        position: bottom;
        padding: 11px 20px;
        color: ${(props) => props.textColor};
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        background: ${(props) => props.backgroundColor};
        border: none;
        border-radius: 44px;
        outline: 0;
        cursor: pointer;
        margin-top: 0.5rem;
        margin-Bottom: 1.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease-out;
        :hover {
            background: ${(props) => props.hoverBackgroundColor};
            color: #FFFFFF;
            animation: ${jump} 0.2s ease-out forwards;
        }


     `
    const A = styled.div`
        align-self: center;
        
        background: #bdb8d;
        height: 150px;
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
        
        <Container>
            <SidebarItem>

                <A></A>
            
                {/*<Button onClick={() => setWillFetch(true)}>Leash</Button>*/}
                <Link id="profile" to={{pathname:"/profile", profile:profile}}>UserImage</Link>
            
                <Button textColor="#000000" backgroundColor="#FFFFFF" hoverBackgroundColor="#A1D3CD" onClick={() => whoAmI()}>profile</Button>
                <Button textColor="#000000" backgroundColor="#FFFFFF" hoverBackgroundColor="#A1D3CD" >Setting</Button>
                
                <A></A>
                <A></A>
                <A></A>
                <Button textColor="#FFFFFF" backgroundColor="#FF7272" hoverBackgroundColor="#FF7272" onClick={() => logout()}>Logout</Button>
                
                <Link id="logout" to="/login"></Link> 
            
            </SidebarItem>
        </Container>
        
    )
}

export default Navbar