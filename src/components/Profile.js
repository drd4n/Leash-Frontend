import React from 'react'
import { useLocation } from 'react-router'
import styled, { keyframes, createGlobalStyle, css } from 'styled-components'

const Username = styled.div`
color:white;
`

export const Profile = () => {
    const location = useLocation()
    const profile = location.profile

    return (
        <div>
         {JSON.stringify(profile)}
         PROFILE
        </div>
    )
}

export default Profile