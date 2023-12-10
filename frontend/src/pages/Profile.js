import React, { useEffect } from 'react'
import axios from 'axios'
import Layout from '../components/layout/Layout'
const Profile = () => {

    const fetchUser=async()=>{
        try{
            const response=await axios.get('/auth/login/success')

        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchUser()
    },[])

  return (
    <Layout>
        <h1>Profile</h1>
    </Layout>
  )
}

export default Profile