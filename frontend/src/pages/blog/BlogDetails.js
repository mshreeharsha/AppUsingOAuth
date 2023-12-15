import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../context/authContext'
import {} from 'antd'
import Modal from 'antd/es/modal/Modal';

const BlogDetails = () => {

  const navigate = useNavigate()

  const [auth] = useAuthContext()

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
        console.log(response.data.message)
      }
    }
    catch(error){
      console.log(error.message)
    }
  }

  useEffect(()=>{
    console.log('Hi')
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
          navigate('/blogs/my-blogs')
        }
        else{
          console.log(response.data.message)
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
                {( blog && blog.author._id===auth.user) ?<><button className='btn btn-info' style={{ marginRight: '10px' }} onClick={handleUpdate}>Edit</button>
                <button className='btn btn-danger' onClick={()=>setVisible(true)}>Delete</button></>:<></>}
            </div>
          </div>
        </div>}
    {blog && (
        <div className='container' style={{ width: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={`/blog/get-photo/${blog._id}`} style={{ width: '500px', height: '300px','marginBottom':'20px' }} alt={blog.title} />
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