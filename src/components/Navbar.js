import axios from 'axios'
import React, { useState, useEffect } from 'react'

export const Navbar = ({setWillFetch}) => {

    function whoAmI() {
        axios.get('http://localhost:3001/auth/whoAmI',{
            headers: {'x-access-token':localStorage.getItem('token')}
        })
    }
    return (
        <>
            <button onClick={() => setWillFetch(true)}>Leash</button>
            <button onClick={() => whoAmI()}>profile</button>
        </>
    )
}

export default Navbar