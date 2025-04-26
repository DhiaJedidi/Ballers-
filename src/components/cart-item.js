import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function CartItem({content,ft}) {
   const [count,setCount] = useState(1)
   const handleClickneg = () =>{
      if(count>1){
      setCount(count-1)
      ft(-content.price)}
   }
   const handleClickpos = () =>{
      setCount(count+1)
      ft(content.price)
   }
   const p = `/product-page/${content.num}`
  return (<>    
  <hr className="light-line"></hr>
  <div className='cartitem'>
      <Link to={p}><img src={content.img} alt="" /></Link>
      <div className="info">
      <h1>{content.nom}</h1>
      <h2>size : {content.size}</h2>
      <h2>color : {content.color}</h2>
      </div>
      <h2>{content.price} dt</h2>
      <div className='counter'><button onClick={handleClickneg}>-</button><p>{count}</p> <button onClick={handleClickpos}>+</button></div>
    </div>
    </>

  )
}

export default CartItem
