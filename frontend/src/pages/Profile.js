import React from 'react'
import Layout from '../components/layout/Layout'
import { useAuthContext } from '../context/authContext'
const Profile = () => {

    const [auth]=useAuthContext()

  return (
    <Layout>
        <div>
            <h1>Profile Page</h1>
            {!auth.user?<div>
                <p>Please Login In to View Your Profile!!</p>
            </div>:<div>
                
            </div>}
        </div>
    </Layout>
  )
}

export default Profile