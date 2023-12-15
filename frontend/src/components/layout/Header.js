import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuthContext } from '../../context/authContext'
import axios from 'axios'
import {toast} from 'react-hot-toast';

const Header = () => {
    const [auth,setAuth]=useAuthContext()
    const [user,setUser]=useState()

    const handleLogout = async()=>{
        setAuth({
            user:null
        })
        localStorage.removeItem('auth')
        toast.success('User Logged Out Successfully')
        window.open("http://localhost:4000/auth/logout", "_self");
    }

    const fetchUser= async()=>{
        try{
            const response = await axios.get('/auth/getUser')
            if(response.data.success){
                setUser(response.data.user)
            }
            else{
                console.log(response.data.message)
            }
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchUser()
    },[])

  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid" style={{'backgroundColor':'#E7BCDE'}}>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link to='/' className="navbar-brand" href="#">
                        HomePage
                    </Link>
                    <Link to='/all' className="navbar-brand" href="#">
                        All Blogs
                    </Link>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {!auth.user ? <><li className="nav-item">
                            <NavLink to='/register' className="nav-link" href="#"><button className='btn btn-info' style={{'marginRight':'2px','backgroundColor':'#FFF78A'}}>SignUp</button></NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink to='/login' className="nav-link" href="#"><button className='btn btn-info' style={{'marginRight':'2px','backgroundColor':'#FFF78A'}}>Login</button></NavLink>
                        </li></>:<></>}
                        {auth.user ? <>
                        <li>
                            <NavLink to='/blogs/create' className="nav-link" href="#"><button className='btn btn-success'>New Blog</button></NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <button className='btn btn-warning'>{user?.username}</button>
                            </NavLink>

                            <ul className="dropdown-menu">
                                <li><NavLink to='/profile' className="dropdown-item"><button className='btn btn-info'>Profile</button></NavLink></li>

                                <li><NavLink to='/blogs/my-blogs' className="dropdown-item" href="#"><button className='btn btn-info'>My Blogs</button></NavLink></li>

                            </ul>
                        </li><li>
                        <NavLink className="nav-link" href="#"><button className='btn btn-danger' onClick={handleLogout}>Logout</button></NavLink>
                        </li></>:<></>}
                    </ul>                
                </div>
            </div>
        </nav>
    </>
  )
}

export default Header
