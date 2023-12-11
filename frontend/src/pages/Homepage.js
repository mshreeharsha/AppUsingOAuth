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
            user:response.data.user,
          })
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
      <Layout>
        <div className='container' style={{'margin':'auto','width':'70%','textAlign':'left'}}>
          <h1 style={{'textAlign':'center'}}>Blog Page</h1>
          <div style={{'color':'#F79327','fontWeight':'bold'}}>
            <p>This Blog App is project depicting the Usage of Google's OAuth.OAuth 2.0, an evolution of the original OAuth protocol, is a widely adopted standard for secure and delegated access to resources on the internet. It provides a framework for third-party applications to access user data from resource servers without requiring the disclosure of sensitive credentials, such as usernames and passwords. </p>
            <p>
            Along with Normal way of login and register, the extra option is login using Google. This is single sign off mechanism as the user need not to remember many passwords, but still can be verified and authenticated for the website.
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
