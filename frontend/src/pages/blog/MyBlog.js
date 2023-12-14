import React from 'react'
import Layout from '../../components/layout/Layout'
import Card from './Card'
import { Link } from 'react-router-dom'

const MyBlog = () => {

  

  return (
    <Layout>
      <h1 style={{'color':'#FF6969','textAlign':'center'}}></h1>
      <div className='container' style={{ 'margin': 'auto', 'width': '80%', 'display': 'flex', 'flexDirection': 'row', 'alignItems': 'center', 'justifyContent': 'center'}}>
        {blogs.map((blog)=>(
          <Link key={blog._id} to={`/blog/${blog._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card blog={blog}/>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default MyBlog