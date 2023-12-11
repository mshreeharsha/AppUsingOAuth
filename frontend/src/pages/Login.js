import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [errors,setErrors]=useState("")

    const handleGoogleClick = ()=>{
        //Opens the google auth from backend
        window.open('http://localhost:4000/auth/google','_self')
    }
    const handleLogin = async()=>{
      try{
        const response=await axios.post('/auth/login',{
          email,password
        })
        if(response.data.success){
          setEmail('')
          setPassword('')
          setErrors('')
          navigate('/')
        }
        else{
          setErrors(response.data.message)
        }
      }
      catch(error){
        console.log(error)
      }
    }
  return (
    <Layout>
      <div className='container' style={{ 'margin': 'auto', 'width': '30%', 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'center', 'justifyContent': 'space-between'}}>
        <h2>Login To Our Website...</h2>
        <div className='col-md-6' style={{ 'width': '100%' }}>
          <div className='row' style={{ 'marginTop': '50px' }}>
            <input type='email' className='form-control' value={email} name='email' onChange={(e) => { setEmail(e.target.value) }} placeholder='Email ID' required />
          </div>
          <div className='row' style={{ 'marginTop': '10px' }}>
            <input type='password' className='form-control' value={password} name='password' onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' required />
          </div>
          <div className='row' style={{ 'marginTop': '10px' }}>
            <button className='btn btn-warning' onClick={handleLogin}>Login</button>
          </div>
          {errors.length > 0 ? <div className='row' style={{ 'marginTop': '10px', 'border':'2px red solid','color':'red','fontWeight':'bold'}}>
            {errors}
          </div>:<></>}
          <div className='container' style={{'justifyContent':'center','marginTop':'10px','marginBottom':'10px','border':'1px grey solid','borderRadius':'50%','width':'30px','height':'30px','paddingRight':'15px','paddingLeft':'3px'}}>
            OR
          </div>
          <div className='row' style={{ 'marginTop': '10px' }}>
            <button onClick={handleGoogleClick} className='btn' style={{ 'backgroundColor': '#FFC47E' }}>Sign in Using Google</button>
          </div>
        </div>
      </div>
    </Layout>

  )
}

export default Login