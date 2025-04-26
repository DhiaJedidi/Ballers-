
import React, { useState } from 'react';
import ProductContainer from '../components/product-container.js';
import { Link } from 'react-router-dom/cjs/react-router-dom.js';
import './items.css';

function Items({ prod }) {
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Sample categories - you can replace with your actual categories
  const categories = ['All', 'tshirt', 'Shorts', 'shoes', 'Accessories', 'Summer Collection'];
  const filteredProducts = activeCategory === 'All' 
    ? prod 
    : prod.filter(item => item.categorie === activeCategory);

  const data = filteredProducts.map((item, index) => {
    const productLink = `/product-page/${index}`;
    return (
      <Link className="link" to={productLink} key={index}>
        <ProductContainer image={item.img} name={item.nom} price={item.price} />
      </Link>
    );
  });

  return (
    <div className='itemspage'>
      <h1 className='itempagetitle'>ITEMS</h1>
      <div className="items-container">
        <div className="categories-sidebar">
          <h3>Categories</h3>
          <ul>
            {categories.map((category, index) => (
              <li 
                key={index}
                className={activeCategory === category ? 'active' : ''}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="products itemproducts">
          {data.length > 0 ? data : <p className="no-products">No products in this category</p>}
        </div>
      </div>
    </div>
  );
}

export default Items;