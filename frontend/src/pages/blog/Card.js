import React from 'react'

const Card = ({blog}) => {
  return (
        <div classname="card" style={{ 'width':'400px','minHeight':'170px','border':'2px grey solid','padding':'10px','paddingBottom':'0px','margin':'10px','display':'flex','flexDirection':'row','backgroundColor':'#FED9ED'}}>
            <img src={`/blog/get-photo/${blog._id}`} classname="card-img-top" alt={blog.title} style={{'width':'200px','height':'120px','margin':'10px','marginTop':'0px'}} />
            <div classname="card-body">
                <h4 classname="card-title" style={{'fontWeight':'bold','color':'#49108B'}}>{blog.title}</h4>
                <h5> <b>Author : </b> {blog.author.username} </h5>
            </div>
        </div>
  )
}

export default Card
