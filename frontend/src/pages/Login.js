import React from 'react'
import Layout from '../components/layout/Layout'

const Login = () => {

    const handleGoogleClick = (req,res)=>{

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