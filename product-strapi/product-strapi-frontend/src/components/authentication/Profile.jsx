import { profileUserData } from '@/lib/authApi'
import React, { useEffect, useState } from 'react'

const Profile = () => {
    const [profile,setProfile] = useState([])
    useEffect(()=>{
        profileUserData().then(res=>console.log(res)).catch((err)=>console.log(err))
    },[])
  return (
    <div>
      
    </div>
  )
}

export default Profile
