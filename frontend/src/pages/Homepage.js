import React, { useEffect } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useAuthContext } from '../context/authContext'
import {toast} from 'react-hot-toast';

const Homepage = () => {
  const [auth,setAuth]=useAuthContext()
  const fetchUser=async()=>{
    try{
        const response=await axios.get('/auth/google/login-success')
        if(response.data.success){
          setAuth({
            user:response.data.user,
          })
        }
        else{
          toast.error(response.data.message)
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
      <Layout>
        <div className='container' style={{'margin':'auto','width':'70%','textAlign':'left'}}>
          <h1 style={{'textAlign':'center'}}>Blog App</h1>
          <div style={{'color':'#49108B','fontWeight':'bold','marginTop':'20px','fontSize':'20px'}}>
            <p>This Blog App is project depicting the Usage of OAuth along with normal method of sign in and register. OAuth provides a framework for third-party applications to access user data from resource servers without requiring the disclosure of sensitive credentials, such as usernames and passwords. </p>
            <p>
            This is single sign off mechanism as the user need not to remember many passwords, but still can be verified and authenticated for the website. This is Implemented using pasportjs.</p>
            <p> <a href="https://www.passportjs.org/" target="_blank">Passportjs</a> has various statergies like GoogleStatergy, GithubStatergy, LocalStatergy (for normal login). And it supports Session Based Authenication instead of Token based.
            </p>
            <p>
              In This website, people can read blogs and only logged in People can upload they own blogs/articles.
            </p>
          </div>
        </div>
      </Layout>
  )
}

export default Homepage
