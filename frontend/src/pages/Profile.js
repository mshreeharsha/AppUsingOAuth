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
            {!auth.user?<div>
                <p>Please Login In to View Your Profile!!</p>
            </div>:<div>
                <div>
                    <img src={auth.user.avatar} alt={auth.user?.username} style={{'height':'150px','width':'150px','marginBottom':'30px','marginTop':'30px'}} />
                </div>
                <div>
                    <p style={{'fontSize':'32px','fontWeight':'bold','color':'#FF5B22'}}>{auth.user?.username}</p>
                </div>
                <div>
                    <p style={{'fontSize':'24px','color':'#FF4B91'}}>{auth.user?.email}</p>
                </div>
            </div>}
        </div>
    </Layout>
  )
}

export default Profile