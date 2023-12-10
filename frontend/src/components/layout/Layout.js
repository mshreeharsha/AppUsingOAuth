import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div style={{'backgroundColor':'#F3F8FF','width':'100%'}}>
      <Header/>
      <main className='container' style={{'width':'70%','margin':'auto','minHeight':"85vH"}}>
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default Layout
