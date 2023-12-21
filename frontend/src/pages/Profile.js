import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useAuthContext } from '../context/authContext'
import axios from 'axios'
import {toast} from 'react-hot-toast';
import { baseURL } from '../baseURL';
const Profile = () => {

    axios.defaults.withCredentials=true

    const [user,setUser]=useState({})
    const [auth]=useAuthContext()
    // console.log(auth)

    const fetchUser= async()=>{
        try{
            const response = await axios.get(`${baseURL}/auth/getUser`)
            if(response.data.success){
                setUser(response.data.user)
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
    },[])

  return (
    <Layout>
        <div className='container' style={{'margin':'auto','textAlign':'center'}}>
            <h2>Profile Page</h2>
            {!auth.user?<div>
                <p>Please Login In to View Your Profile!!</p>
            </div>:<div>
                {user.avatar?<div>
                    <img src={user.avatar} alt={user.username} style={{'height':'150px','width':'150px','marginBottom':'30px','marginTop':'30px'}} />
                </div>:<></>}
                <div>
                    <p style={{'fontSize':'32px','fontWeight':'bold','color':'#FF5B22'}}>{user?.username}</p>
                </div>
                <div>
                    <p style={{'fontSize':'24px','color':'#FF4B91'}}>{user?.email}</p>
                </div>
            </div>}
        </div>
    </Layout>
  )
}

export default Profile