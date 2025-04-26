import React from 'react'
import ig from './images/ig.png'
import fcb from './images/fcb.png'
import tk from './images/tk.png'
import th from './images/th.png'
import img from './images/logo-ballers-black.png'

function Footer() {
  return (
    <div >
      <h1>join our newsletter to receive our best deals</h1>
      <ul className='buttons'>
      <li><input type="email" placeholder='Your Email' /></li>
      <li><input className='sub' value='Submit' type='submit'/></li>
      </ul>
      <div className='bottom-line'>
      
      <ul className='list'>
      <img src={img} alt="" className='logo' />
      <p>Ballers.tn</p>
      <li><img src={ig} alt="" /></li>
      <li><img src={fcb} alt="" /></li>
      <li><img src={tk} alt="" /></li>
      <li><img src={th} alt="" /></li>
      </ul>
      </div>
    </div>
  )
}

export default Footer
