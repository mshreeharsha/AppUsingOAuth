import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'
import {toast} from 'react-hot-toast';

import Google from '../images/google.png'
import Github from '../images/github.png'
import { baseURL } from '../baseURL'

const Login = () => {
    const [auth,setAuth]=useAuthContext()
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [errors,setErrors]=useState("")

    const handleGoogleClick = ()=>{
        //Opens the google auth from backend
        window.open(`${baseURL}/auth/google`,'_self')
    }

    const handleGithubClick = ()=>{
        //Opens the github auth from backend
        window.open(`${baseURL}/auth/github`,'_self')
    }

    const handleLogin = async()=>{
      try{
        const response=await axios.post('/auth/login',{
          email,password
        },{
          headers: {
            'Content-Type': 'application/json'
          }})
        if(response.data.success){
          setEmail('')
          setPassword('')
          setErrors('')
          setAuth({
            user:response.data.user,
          })
          toast.success(response.data.message)
          navigate('/')
        }
        else{
          const res=await axios.get('/auth/login-failure')
          setErrors(res.data.message)
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
          {errors ? <div className='row' style={{ 'marginTop': '10px', 'border':'2px red solid','color':'red','fontWeight':'bold'}}>
            {errors}
          </div>:<></>}
          <div className='container' style={{'justifyContent':'center','marginTop':'10px','marginBottom':'10px','border':'1px grey solid','borderRadius':'50%','width':'30px','height':'30px','paddingRight':'15px','paddingLeft':'3px'}}>
            OR
          </div>
          <div className='row' style={{ 'marginTop': '10px' }}>
            <button onClick={handleGoogleClick} className='btn' style={{ 'backgroundColor': '#FFC47E' }}><img src={Google} alt='google' style={{'width':'30px', 'height':'30px'}}/> Google</button>
          </div>
          <div className='row' style={{ 'marginTop': '10px' }}>
            <button onClick={handleGithubClick} className='btn' style={{ 'backgroundColor': '#FFC47E' }}><img src={Github} alt='github' style={{'width':'30px', 'height':'30px'}}/>  Github</button>
          </div>
        </div>
      </div>
    </Layout>

  )
}

export default Login