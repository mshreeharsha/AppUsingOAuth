import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast';

const NewBlog = () => {
    const navigate = useNavigate()
    const [title,setTitle]=useState('')
    const [photo,setPhoto]=useState('')
    const [intro,setIntro]=useState('')
    const [main,setMain]=useState('')
    const [error,setError]=useState('')
    const [conclusion,setConclusion]=useState('')

    const handleSubmit = async()=>{
        try{
            const i=intro.replace(/\n/g,'|')
            const m=main.replace(/\n/g,'|')
            const c=conclusion.replace(/\n/g,'|')

            const blogData = new FormData()
            blogData.append("title",title)
            blogData.append("photo",photo)
            blogData.append("contentIntro",i)
            blogData.append("contentMain",m)
            blogData.append("contentConclusion",c)

            const response= await axios.post('/blog/create-blog',blogData)

            if(response.data.success){
                setTitle("")
                setIntro("")
                setMain("")
                setConclusion("")
                setPhoto("")
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
            <h2>Create a New Blog</h2>
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
                    {photo && (
                      <div className="text-center">
                        <img src={URL.createObjectURL(photo)} alt={"Blog Pic"}
                        height={"300px"} width={"500px"}
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
                    <button className='btn btn-warning' onClick={handleSubmit}>Create</button>
                </div>
            </div>
        
        </div>
    </Layout>
  )
}

export default NewBlog
