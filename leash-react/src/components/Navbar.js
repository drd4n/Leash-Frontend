import axios from 'axios'
import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'

export const Navbar = () => {

    const [profile, setProfile] = useState({})
    const [src, setSrc] = useState("")

    useEffect(() => {
        axios.get(process.env.REACT_APP_NODE_ENDPOINT+`/auth/whoAmI`, {
            headers: { 'x-access-token': localStorage.getItem('token') }
        }).then(async (res) => {
            setProfile(res.data)
            await axios.get(process.env.REACT_APP_NODE_ENDPOINT+`/auth/showProfileImage/${res.data.profile_picture}`, {
                headers: { 'x-access-token': localStorage.getItem('token') }
            })
                .then((res) => {
                    setSrc(res.data.profile_src)
                })
        })
    }, [])

    const whoAmI = async () => {
        try {
            // const data = await axios.get('process.env.NODE_ENDPOINT/auth/whoAmI', {
            //     headers: { 'x-access-token': localStorage.getItem('token') }
            // })
            // setProfile(data.data)
            document.getElementById("profile").click()
        } catch (error) {
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
        align-items: center;
        align-content: center;
        flex-direction: column;
        width: 250px;
        height: 100%;
        background: #242526;
        position: fixed;
        gap: 50%;
        z-index: 1;
    `;

    const SidebarItem = styled.div`
        margin-top: 15px;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 0px;
    `

    const Button = styled.button`
        max-width: 100%;
        min-width: 50%;
        padding: 11px 20px;
        color: ${(props) => props.textColor};
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        background: ${(props) => props.backgroundColor};
        border: none;
        border-radius: 44px;
        cursor: pointer;
        margin-top: 0.25rem;
        margin-Bottom: 1.25rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease-out;
        :hover {
            background: ${(props) => props.hoverBackgroundColor};
            color: #FFFFFF;
            animation: ${jump} 0.2s ease-out forwards;
        }
     `

    const ProfileImg = styled.img`
        width: 150px;
        height: 150px;
        border-radius: 50%;
        display:flex;
        margin: 20px;
    `

    function logout() {
        // if (!TokenValidate()) {
        //     return alert("session out of date")
        // }
        axios.post(process.env.REACT_APP_NODE_ENDPOINT+`/auth/logout`, {
            token: localStorage.getItem('token')
        })

            .then((res) => {
                if (res.status === 200) {
                    localStorage.clear()
                    return document.getElementById("logout").click()
                }
            })
    }

    return (

        <Container>
            <SidebarItem>

                {/*<Button onClick={() => setWillFetch(true)}>Leash</Button>*/}
                <Link id="profile" to={{ pathname: "/profile", owner_id: profile._id }}><ProfileImg src={src} /></Link>

                <Button textColor="#000000" backgroundColor="#FFFFFF" hoverBackgroundColor="#A1D3CD" onClick={() => whoAmI()}>profile</Button>
            
                {/* <p>{src}</p> */}

            </SidebarItem>
            <SidebarItem>

                <Button textColor="#FFFFFF" backgroundColor="#FF7272" hoverBackgroundColor="#FF7272" onClick={() => logout()}>Logout</Button>
                <Link id="logout" to="/login"></Link>

            </SidebarItem>
        </Container>
    )
}

export default Navbar