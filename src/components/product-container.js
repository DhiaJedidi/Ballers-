import React from 'react'



function ProductContainer(props) {
  return (
    <div className='product'>
      <div className="p-content">
      <div className="p-con-img">
      <img src={props.image} alt="product image not found" />
      </div>
      <h1>{props.name}</h1>
      <h3>{props.price} dt</h3>
      </div>
    </div>
  )
}

export default ProductContainer
