import React, { useState } from 'react';
import './AdminDashboard.css';
import { useEffect } from "react";
import axios from 'axios';
const AdminDashboard = (props) => {

  const [activeTab, setActiveTab] = useState('products');
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([
    { id: 1, customer: 'John Doe', date: '2023-06-15', total: 89.98, status: 'completed' },
    { id: 2, customer: 'Jane Smith', date: '2023-06-16', total: 39.99, status: 'processing' },
  ]);

  const [newProduct, setNewProduct] = useState({
    img: null,
    nom: '',
    price: '',
    color: '',
    categorie: ''
  });

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);


  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => {
        // Directly use the data without reformatting
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };





  const handleUserDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/users/${id}`, {
        method: "DELETE"
      });

  
      if (res.ok) {
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleProductDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };



  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nom", newProduct.nom);
    formData.append("price", newProduct.price);
    formData.append("color", newProduct.color);
    formData.append("categorie", newProduct.categorie);
    formData.append("img", newProduct.img);
  
    // Correct way to view FormData content:
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    try {
      const response = await axios.post("http://localhost:3001/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Product created:", response.data);
      setProducts(prev => [...prev, response.data]);
      setNewProduct({
        img: null,
        nom: '',
        price: '',
        color: '',
        categorie: ''
      });
    } catch (error) {
      console.error("There was an error creating the product:", error);
    }
  };
  

 

  
  
  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>BALLERS SHOP ADMIN</h1>
        <p>Manage your store efficiently</p>
      </header>

      <div className="dashboard-container">
        <nav className="dashboard-nav">
          <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>Manage Products</button>
          <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>Manage Users</button>
          <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>Manage Orders</button>
        </nav>

        <div className="dashboard-content">
          {activeTab === 'products' && (
            <div className="products-section">
              <h2>Latest Products</h2>
              <div className="add-product-form">
                <h3>Add New Product</h3>
                <form onSubmit={handleSubmit} className="add-product-form">
                  <h3>Add New Product</h3>
                  <div className="form-group">
                    <input
                      type="text"
                      name="nom"
                      placeholder="Product Name"
                      value={newProduct.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="file"
                      name="img"
                      accept="image/*"
                      onChange={(e) => setNewProduct(prev => ({ ...prev, img: e.target.files[0] }))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      name="price"
                      placeholder="Price"
                      value={newProduct.price }
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="color"
                      placeholder="Color"
                      value={newProduct.color}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="categorie"
                      placeholder="categorie"
                      value={newProduct.categorie}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button className="add-button" type="submit">Add Product</button>
                </form>
                </div>

              <div className="products-list">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>categorie</th>
                      <th>Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={product._id}>
                        <td>{index}</td>
                        <td>{product.nom}</td>
                        <td>${Number(product.price || 0).toFixed(2)}</td>
                        <td>{product.categorie}</td>
                        <td>
                        <img 
                          src={`http://localhost:3001/uploads/${product.img}`}
                          alt={product.nom} 
                          style={{ width: '40px', height: '40px', objectFit: 'cover' }} 
                        /> 
                        </td>
                        <td>
                          <button className="edit-btn">Edit</button>
                          <button className="delete-btn" onClick={() => handleProductDelete(product._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="users-section">
              <h2>User Management</h2>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user,index) => (
                    <tr key={user._id}>
                    <td>{index +1 }</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <button onClick={() => handleUserDelete(user._id )} className="delete-btn">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="orders-section">
              <h2>Order Management</h2>
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order._id}>
                      <td>{index}</td>
                      <td>{order.customer}</td>
                      <td>{order.date}</td>
                      <td>${order.total.toFixed(2)}</td>
                      <td>
                        <select defaultValue={order.status}>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <button className="view-btn">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
