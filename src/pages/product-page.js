import React from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';



function ProductPage({prods,onAddEntry}) {
   const {index} = useParams()

   const data = prods.map((item,i) =>{
      if(i<2){
      const lol = `/product-page/${i}`;
      return(
      <Link to={lol}><div  style={{backgroundColor: prods[i].color ,width : '20px',height : '20px', border : 'solid 1px black'}}></div></Link>
      )}
      else return null;
   })
   const table_n = [];
   for(let i=1;i<=5;i++){
      table_n.push(i)
   }
   const handleClick = () =>{
      onAddEntry(prods[index])
   }
   return (
    <div className='ppage'>
      <div className="main">
      <main >
      <img src={prods[index].img} alt="image not found" className='big-img' />
      <ul className='s-img'>
      {table_n.map((item) =>{
                  return(
                     <img src={prods[item-1].img} alt='image not found '></img>
                  )
               })}
      </ul>
      </main>
      <aside>
         <div className="title">
            <h1>Artist on the court t-shirt</h1>
            <h3>59 dt</h3>
         </div>
         <hr className="light-line"></hr>
         <div className="color" >
         <h1>Color</h1>
         <h2>{prods[index].color}</h2>
         <ul style={{display : 'flex', gap : '5px',margin:'0',padding:'0'}}>
               {data}
         </ul>
         <hr className="light-line"></hr>
           
         </div>
         
         <div className="size">
            <h1>Size</h1>
            <h2>M</h2>
            <ul className="sizes">
               <li>S</li>
               <li>M</li>
               <li>L</li>
               <li>XL</li>
               <li>XXL</li>
            </ul>
         </div>
         <hr className="light-line"></hr>
         <div className='purchase'>
            <select name="" id="">
               {table_n.map((item) =>{
                  return(
                     <option value={item}>{item}</option>
                  )
               })}
               
            </select>
            
            <button onClick={handleClick}>add to cart</button>
         </div>
      </aside>
      </div>
    </div>
  )
}

export default ProductPage
