import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../../components/layout/Layout'
import { useAuthContext } from '../../context/authContext'
import {toast} from 'react-hot-toast';

const UpdateBlog = () => {

    const navigate = useNavigate()
    const params = useParams()
    const [auth]=useAuthContext()
    const [title,setTitle]=useState('')
    const [photo,setPhoto]=useState('')
    const [intro,setIntro]=useState('')
    const [main,setMain]=useState('')
    const [error,setError]=useState('')
    const [id,setId]=useState('')
    const [conclusion,setConclusion]=useState('')

    const fetchBlog = async()=>{
        try{
            const response = await axios.get(`/blog/get-blog/${params.bid}`)
            if(response.data.success){
                
                if(response.data.blog.author._id!==auth.user){
                    navigate('/blogs/my-blogs')
                }
                setId(response.data.blog._id)
                setTitle(response.data.blog.title)
                setPhoto(response.data.blog.photo)
                setIntro(response.data.blog.contentIntro.replace(/\|/g, '\n'))
                setMain(response.data.blog.contentMain.replace(/\|/g, '\n'))
                setConclusion(response.data.blog.contentConclusion.replace(/\|/g, '\n'))
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
    },[params.bid])

    const handleUpdate = async()=>{
        try{
            const i=intro.replace(/\n/g,'|')
            const m=main.replace(/\n/g,'|')
            const c=conclusion.replace(/\n/g,'|')

            const blogData = new FormData()
            blogData.append("title",title)
            photo && blogData.append("photo",photo)
            blogData.append("contentIntro",i)
            blogData.append("contentMain",m)
            blogData.append("contentConclusion",c)

            const response= await axios.put(`/blog/update-blog/${params.bid}`,blogData)

            if(response.data.success){
                setTitle("")
                setIntro("")
                setMain("")
                setConclusion("")
                setPhoto("")
                setId("")
                toast.success(response.data.message)
                navigate('/blogs/my-blogs')
            }
            else{
                setError(response.data.message)
            }
        }
        catch(error){
            console.log(error.message)
        }
    }

  return (
    <Layout>
        <div className='container' style={{'marginTop':'20px','width':'50%','display': 'flex', 'flexDirection': 'column', 'alignItems': 'center', 'justifyContent': 'space-between'}}>
            <h2>Update Blog</h2>
            <div className='col-md-6' style={{ 'width': '100%' }}>
                <div className='row' style={{ 'marginTop': '50px' }}>
                    <input type='text' className='form-control' value={title} name='title' onChange={(e) => { setTitle(e.target.value) }} placeholder='Title' required />
                </div>
                <div className='row' style={{ 'marginTop': '10px' }}>
                    <input type="file" name="photo" accept="images/*" onChange={(e)=>{
                            setPhoto(e.target.files[0])
                        }}/>
                </div>
                <div className='row' style={{ 'marginTop': '10px' }}>
                    {photo ? (
                      <div className="text-center">
                        <img src={URL.createObjectURL(photo)} alt={"Blog Pic"}
                        height={"200px"}
                        className='img img-responsive'/>
                      </div>
                    ):(
                        <div className="text-center">
                            <img src={`/blog/get-photo/${id}`} alt={"Blog Pic"}
                            height={"200px"}
                            className='img img-responsive'/>
                        </div>
                    )}
                </div>
                <div className='row' style={{ 'marginTop': '10px' }}>
                    <textarea name="intro" placeholder='Introduction' value={intro} onChange={(e)=>{
                            setIntro(e.target.value)
                        }} rows={4}></textarea>
                </div>
                <div className='row' style={{ 'marginTop': '10px' }}>
                    <textarea name="main" placeholder='Main Para' value={main} onChange={(e)=>{
                            setMain(e.target.value)
                        }} rows={4}></textarea>
                </div>
                <div className='row' style={{ 'marginTop': '10px' }}>
                    <textarea name="conclusion" placeholder='Conclusion' value={conclusion} onChange={(e)=>{
                            setConclusion(e.target.value)
                        }} rows={4}></textarea>
                </div>
                {error.length > 0 && <div className='row' style={{ 'marginTop': '10px','fontWeight':'bold', 'color':'red','border':'2px solid red'}}>
                    {error}
                </div>}
                <div className='row' style={{ 'marginTop': '10px','marginBottom':'60px' }}>
                    <button className='btn btn-info' onClick={handleUpdate}>Update</button>
                </div>
            </div>
        
        </div>
    </Layout>
  )
}

export default UpdateBlog