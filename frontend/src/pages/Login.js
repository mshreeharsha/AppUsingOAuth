import React from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'

const Login = () => {

    const handleGoogleClick = ()=>{
        //Opens the google auth from backend
        window.open('http://localhost:4000/auth/google','_self')
    }

  return (
    <Layout>
        <div className='container'>
            <h2>Login To Our Website...</h2>
            <button onClick={handleGoogleClick} className='btn' style={{'backgroundColor':'#FFC47E'}}>Sign in Using Google</button>
        </div>
    </Layout>
  )
}

export default Login