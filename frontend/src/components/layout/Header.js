import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuthContext } from '../../context/authContext'
import axios from 'axios'

const Header = () => {
    const [auth,setAuth]=useAuthContext()

    const handleLogout = async()=>{
        setAuth({
            user:null,
            cookie:''
        })
        const response = await axios.get('/auth/logout')
    }
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid" style={{'backgroundColor':'#E7BCDE'}}>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link to='/' className="navbar-brand" href="#">
                        HomePage
                    </Link>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {!auth?.user?<><li className="nav-item">
                            <NavLink to='/register' className="nav-link" href="#"><button className='btn btn-info' style={{'marginRight':'2px','backgroundColor':'#FFF78A'}}>SignUp</button></NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink to='/login' className="nav-link" href="#"><button className='btn btn-info' style={{'marginRight':'2px','backgroundColor':'#FFF78A'}}>Login</button></NavLink>
                        </li></>:<></>}
                        {auth?.user?<li>
                        <NavLink to='/login' className="nav-link" href="#"><button className='btn btn-danger' onClick={handleLogout}>Logout</button></NavLink>
                        </li>:<></>}
                        {auth?.user?<li>
                        <NavLink to='/profile' className="nav-link" href="#"><button className='btn btn-danger'>Profile</button></NavLink>
                        </li>:<></>}
                    </ul>                
                </div>
            </div>
        </nav>
    </>
  )
}

export default Header
