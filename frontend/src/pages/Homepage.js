import React, { useEffect } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useAuthContext } from '../context/authContext'

const Homepage = () => {
  const [auth,setAuth]=useAuthContext()
  const fetchUser=async()=>{
    try{
        const response=await axios.get('/auth/google/login-success')
        if(response.data.success){
          setAuth({
            ...auth,
            user:response.data.user.user,
            cookie:response.data.user.cookie
          })
          console.log('h1'+response.data.cookie)
          localStorage.setItem("auth", JSON.stringify(response.data.user));
        }
        else{
          console.log(response.data.message)
        }
    }
    catch(error){
        console.log(error)
    }
  }

  useEffect(()=>{
      fetchUser()
      // eslint-disable-next-line
  },[])

  return (
    <div>
      <Layout>
        
      </Layout>
    </div>
  )
}

export default Homepage
