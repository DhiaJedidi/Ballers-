import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import CartItem from '../components/cart-item'
function calcul(t){
   let s=0;
   t.map((item) => {
      s = s + item.price
   })
   return s
}

function Cart({items}) {
   const [lol, setLol] = useState(calcul(items))
   const handleAddEntry = (newEntry) => {
      setLol(lol+newEntry);
    };
   const data = items.map((item) => {
      return(
      <CartItem content={item} ft={handleAddEntry}></CartItem>
       
      )
   })
   
  return (
   <div className="cart">
    <div className='container'>
      <div>
      <div className="topline">
      
      <h1 className='ncart'>cart &#40;{items.length}&#41;</h1>
      <Link className='link' to='/'><p className='contine_shop_button'>continue shopping</p></Link>

      </div>
      {data}
      </div>
      
      <div className="right">
         <div className="topright">
         <h1>total</h1>
         <h1 className='total'>{lol} dt</h1>
         </div>
         <hr className="light-line"></hr>
         <button>confirm</button>
         <h3>delivery : 8dt </h3> 
      </div>
      </div>
      </div>
  )
}

export default Cart
