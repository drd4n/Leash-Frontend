import React from 'react'
import { useLocation } from 'react-router'

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