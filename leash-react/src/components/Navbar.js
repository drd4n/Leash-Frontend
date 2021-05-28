import React, { useState, useEffect } from 'react'

export const Navbar = ({setWillFetch}) => {

    return (
        <>
            <button onClick={() => setWillFetch(true)}>Leash</button>
        </>
    )
}

export default Navbar