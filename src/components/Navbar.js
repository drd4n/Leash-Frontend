import axios from 'axios'
import React, { useState, useEffect } from 'react'
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
        <>
            <button onClick={() => setWillFetch(true)}>Leash</button>
            <button onClick={() => whoAmI()}>profile</button>
            <button onClick={() => logout()}>Logout</button>
            <Link id="profile" to={{pathname:"/profile", profile:profile}}></Link>
            <Link id="logout" to="/login"></Link>
        </>
    )
}

export default Navbar