import React from 'react'
import { useLocation } from 'react-router'
import styled, { keyframes, createGlobalStyle, css } from 'styled-components'

const Username = styled.div`
color:white;
`

export const Profile = () => {
    const location = useLocation()
    const profile = location.profile
    const [src, setSrc] = useState("")

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/showProfileImage/${profile.profile_picture}`, {
            headers: { 'x-access-token': localStorage.getItem('token') }
        })
        .then((res) => {
            setSrc(res.data.profile_picture)
        })
    }, [])

    return (
        <div>
            {JSON.stringify(profile)}
            PROFILE
        </div>
    )
}

export default Profile