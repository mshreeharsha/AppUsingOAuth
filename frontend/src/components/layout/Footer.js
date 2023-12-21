import React from 'react'

const Footer = () => {
  return (
    <div style={{'textAlign':'center','backgroundColor':'#E7BCDE','fontWeight':'bold'}}>
      <div>Created by M Shree Harsha Bhat</div>
      <div>{new Date().getFullYear()}</div>
    </div>
  )
}

export default Footer
