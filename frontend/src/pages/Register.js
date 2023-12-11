import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate=useNavigate()
    const [username,setUsername] = useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [errors,setErrors]=useState("")

    const handleGoogleClick = ()=>{
        //Opens the google auth from backend
        window.open('http://localhost:4000/auth/google','_self')
    }
    const handleRegister = async(e)=>{
      try{
        e.preventDefault()
        const response=await axios.post('http://localhost:4000/auth/register',{
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
        <form onSubmit={(e)=>handleRegister(e)}>
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
            <button className='btn btn-warning' type="submit">Register</button>
          </div>
          {errors.length > 0 ? <div className='row' style={{ 'marginTop': '10px', 'border':'2px red solid','color':'red','fontWeight':'bold'}}>
            {errors}
          </div>:<></>}
          <div className='container' style={{'justifyContent':'center','marginTop':'10px','marginBottom':'10px','border':'1px grey solid','borderRadius':'50%','width':'30px','height':'30px','paddingRight':'15px','paddingLeft':'3px'}}>
            OR
          </div>
          <div className='row' style={{ 'marginTop': '10px' }}>
            <button onClick={handleGoogleClick} className='btn' style={{ 'backgroundColor': '#FFC47E' }}>Register in Using Google</button>
          </div>
        </div>
        </form>
      </div>
    </Layout>

  )
}

export default Register
