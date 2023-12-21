import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div style={{'backgroundColor':'#F4EEEE','width':'100%'}}>
      <Header/>
      <main className='container' style={{'width':'70%','margin':'auto','minHeight':"80vH"}}>
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default Layout
