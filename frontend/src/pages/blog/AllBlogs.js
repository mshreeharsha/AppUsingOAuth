import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Card from './Card'
import {toast} from 'react-hot-toast';

const AllBlogs = () => {

  const [blogs,setBlogs]=useState([])

  const fetchAllBlogs = async()=>{
    try{
      const response = await axios.get('/blog/get-all-blogs')

      if(response.data.success){
        setBlogs(response.data.allBlogs)
        console.log(blogs)
      }
      else{
        toast.error(response.data.message)
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
      <h1 style={{'color':'#49108B','textAlign':'center'}}>Navigating the Web Development World</h1>
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

export default AllBlogs
