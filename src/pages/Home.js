
import band from './images/band.jpeg'
import ProductContainer from '../components/product-container.js'
import { Link } from 'react-router-dom/cjs/react-router-dom.js';



function Home({prod}) {
  const data =prod.slice(0,6).map((item,index) =>{
    const lol = `/product-page/${index}`
    return(
   <Link className="link" to={lol}><ProductContainer image={item.img} name={item.nom} price={item.price} /></Link>
    )
  })


  return (
    
    <div className="home">

      <div className='image_container'>
      <img src={band} className='img' alt="not found !" />
      </div>
      <h2>Ballers shop</h2>
      <h4>check our new summer collection !</h4>
      <a className='bt-item' href="/items">check items</a>
      <h3>Latest Products</h3>
      <div className="products">
        {data}
      </div>
      
     
      
    </div>
  )
}

export default Home
