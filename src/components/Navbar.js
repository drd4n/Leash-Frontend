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
    return (
        <>
            <button onClick={() => setWillFetch(true)}>Leash</button>
            <button onClick={() => whoAmI()}>profile</button>
            <Link id="profile" to={{pathname:"/profile", profile:profile}}></Link>
        </>
    )
}

export default Navbar