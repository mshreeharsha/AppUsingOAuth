import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import Card from './Card'
import { Link } from 'react-router-dom'
import axios from 'axios'

const MyBlog = () => {

  const [blogs,setBlogs]=useState([])

  const fetchAllBlogs = async()=>{
    try{
      const response = await axios.get('/blog/get-all-user-blog')

      if(response.data.success){
        setBlogs(response.data.allBlogs)
        // console.log(blogs)
      }
      else{
        console.log(response.data.message)
      }
    }
    catch(error){
      console.log(error.message)
    }
  }

  useEffect(()=>{
    fetchAllBlogs()
    // eslint-disable-next-line
  },[])

  return (
    <Layout>
      <h1 style={{'color':'#49108B','textAlign':'center'}}>"Creativity is intelligence having fun."<br/> - Albert Einstein</h1>
      <h2 style={{'marginTop':'50px','textAlign':'center'}}>My Creative Works</h2>

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