import React from 'react'
import Layout from '../components/layout/Layout'
import { useAuthContext } from '../context/authContext'
const Profile = () => {

    const [auth]=useAuthContext()
    console.log(auth)

  return (
    <Layout>
        <div className='container' style={{'margin':'auto','textAlign':'center'}}>
            <h2>Profile Page</h2>
            {!auth?.user?<div>
                <p>Please Login In to View Your Profile!!</p>
            </div>:<div>
                <p>{auth.user.username}</p>
                <p>{auth.user.email}</p>
            </div>}
        </div>
    </Layout>
  )
}

export default Profile