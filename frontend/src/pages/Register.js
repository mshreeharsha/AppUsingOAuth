import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast';

import Google from '../images/google.png'
import Github from '../images/github.png'
import { baseURL } from '../baseURL';

const Register = () => {
  axios.defaults.withCredentials=true
  const navigate=useNavigate()
    const [username,setUsername] = useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [errors,setErrors]=useState("")

    //Register using Google OAuth
    const handleGoogleClick = ()=>{
        //Opens the google auth from backend
        window.open(`${baseURL}/auth/google`,'_self')
    }

    //Register using Github Auth
    const handleGithubClick = ()=>{
      //Opens the github auth from backend
      window.open(`${baseURL}/auth/github`,'_self')
  }

    //Handling Manual Register
    const handleRegister = async(e)=>{
      try{
        // e.preventDefault()
        const response=await axios.post(`${baseURL}/auth/register`,{
          username,email,password
        },{
          headers: {
            'Content-Type': 'application/json'
          }})
        if(response.data.success){
          setEmail('')
          setUsername('')
          setPassword('')
          setErrors('')
          toast.success(response.data.message)
          navigate('/login')
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
        <h2>Don't Have an Account Yet?? Register Now...</h2>
        
        <div className='col-md-6' style={{ 'width': '100%' }}>
          <div className='row' style={{ 'marginTop': '50px' }}>
            <input type='text' className='form-control' value={username} name='username' onChange={(e) => { setUsername(e.target.value) }} placeholder='User Name' required />
          </div>
          <div className='row' style={{ 'marginTop': '10px' }}>
            <input type='email' className='form-control' value={email} name='email' onChange={(e) => { setEmail(e.target.value) }} placeholder='Email ID' required />
          </div>
          <div className='row' style={{ 'marginTop': '10px' }}>
            <input type='password' className='form-control' value={password} name='password' onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' required />
          </div>
          <div className='row' style={{ 'marginTop': '10px' }}>
            <button className='btn btn-warning' onClick={handleRegister}>Register</button>
          </div>
          {errors.length > 0 ? <div className='row' style={{ 'marginTop': '10px', 'border':'2px red solid','color':'red','fontWeight':'bold'}}>
            {errors}
          </div>:<></>}
          <div className='container' style={{'justifyContent':'center','marginTop':'10px','marginBottom':'10px','border':'1px grey solid','borderRadius':'50%','width':'30px','height':'30px','paddingRight':'15px','paddingLeft':'3px'}}>
            OR
          </div>
          <div className='row' style={{ 'marginTop': '10px' }}>
            <button onClick={handleGoogleClick} className='btn' style={{ 'backgroundColor': '#FFC47E' }}><img src={Google} alt='google' style={{'width':'30px', 'height':'30px'}}/> Google</button>
          </div>
          <div className='row' style={{ 'marginTop': '10px' }}>
            <button onClick={handleGithubClick} className='btn' style={{ 'backgroundColor': '#FFC47E' }}><img src={Github} alt='github' style={{'width':'30px', 'height':'30px'}}/> Google</button>
          </div>
        </div>
        
      </div>
    </Layout>

  )
}

export default Register
