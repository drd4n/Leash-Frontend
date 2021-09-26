import React from 'react'
import { useLocation } from 'react-router'

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