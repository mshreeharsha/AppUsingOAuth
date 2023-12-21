import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../context/authContext'
import {} from 'antd'
import Modal from 'antd/es/modal/Modal';
import {toast} from 'react-hot-toast';

import Edit from '../../images/edit.png'
import Delete from '../../images/delete.png'

const BlogDetails = () => {

  const navigate = useNavigate()

  const [auth,setAuth] = useAuthContext()

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

  const [blog,setBlog] = useState('')
  const [visible,setVisible] = useState(false)
  const params=useParams()

  const fetchBlog = async()=>{
    try{
      const response= await axios.get(`/blog/get-blog/${params.bid}`)
      if(response.data.success){
        setBlog(response.data.blog)
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
    fetchBlog()
    // eslint-disable-next-line
  },[params.bid])

  //Handling the Edit button Click
  const handleUpdate = ()=>{
    navigate(`/blogs/update/${blog._id}`)
  }

  //Handling deleting of a blog
  const handleDelete = async()=>{
    try{
      if(blog.author._id!==auth.user){
        navigate('/all')
      }
      else{
        const response = await axios.delete(`/blog/delete-blog/${blog._id}`)
        if(response.data.success){
          setVisible(false)
          toast.success(response.data.message)
          navigate('/blogs/my-blogs')
        }
        else{
          toast.error(response.data.message)
        }
      }
    }
    catch(error){
      console.log(error.message)
    }
  }

  return (
    <Layout>
        <h1 style={{ color: '#49108B', textAlign: 'center' }}>{blog.title}</h1>
        {blog && <div style={{ width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 'auto' }}>
          <div style={{ fontSize: '18px', textAlign: 'center' }}>
            <h5>Author: <b>{blog.author.username}</b></h5>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
                {( blog && blog.author._id===auth.user) ?<><button className='btn btn-info' style={{ marginRight: '10px' }} onClick={handleUpdate}><img src={Edit} style={{'width':'30px','height':'30px'}} alt='edit'/></button>
                <button className='btn btn-danger' onClick={()=>setVisible(true)}><img src={Delete} style={{'width':'30px','height':'30px'}} alt='delete' /></button></>:<></>}
            </div>
          </div>
        </div>}
    {blog && (
        <div className='container' style={{ width: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={`/blog/get-photo/${blog._id}`} style={{ width: '700px', height: '400px','marginBottom':'20px' }} alt={blog.title} />
            </div>
            <div style={{ fontSize: '18px', textAlign: 'left' }}>
              {blog.contentIntro && (
                <ul>
                    {blog.contentIntro.split('|').map((intro, index) => (
                        <div key={index}><span>{intro}</span><br /></div>
                    ))}
                </ul>
              )}
            </div>
            <div style={{ fontSize: '18px', textAlign: 'left' }}>
                {blog.contentMain && (
                  <ul>
                      {blog.contentMain.split('|').map((main, index) => (
                          <div key={index}><span>{main}</span><br /></div>
                      ))}
                  </ul>
                )}
            </div>
            <div style={{ fontSize: '18px', textAlign: 'left' }}>
                {blog.contentConclusion && (
                  <ul>
                      {blog.contentConclusion.split('|').map((conclusion, index) => (
                          <div key={index}><span>{conclusion}</span><br /></div>
                      ))}
                  </ul>
                )}
            </div>
        </div>)}
        <Modal onCancel={() => setVisible(false)} 
          footer = {null} 
          open ={visible} >
            <div className='container'>
              <div style={{'color':'red','fontSize':'32px','fontWeight':'bold'}}>
                Do You want to delete the Blog
              </div>
              <div>
                <button className='btn btn-info' style={{'margin':'10px'}} onClick={()=>{setVisible(false)}}>NO</button>
                <button className='btn btn-danger' onClick={handleDelete}>YES</button>
              </div>
            </div>
        </Modal>
    </Layout>
  )
}

export default BlogDetails