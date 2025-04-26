import React, { useState, useEffect } from 'react';
import './navbar.css';
import img from './images/logo-ballers-black.png';
import { Link, useHistory } from 'react-router-dom'; // Use useHistory instead of useNavigate
import cart from './images/cart.png';

function NavBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useHistory(); // Initialize useHistory

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      const expiry = localStorage.getItem('token_expiry');
    
      const isTokenExpired = expiry && Date.now() > parseInt(expiry);
    
      if (!token || isTokenExpired) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('token_expiry');
        setIsAuthenticated(false);
        setIsAdmin(false);
      } else {
        setIsAuthenticated(true);
        setIsAdmin(role === 'admin');
      }
    };

    checkAuth(); // Initial check
    window.addEventListener('storage', checkAuth); // Watch for login/logout changes

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('token_expiry');
    setIsAuthenticated(false);
    setIsAdmin(false);
    history.push('/'); // Redirect to home page after logout
  };

  return (
    <div className='navbar'>
      <a href="/"><img className='logo' src={img} alt="Ballers Logo" /></a>
      <div className="menu_cont">
        <ul className='menu'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to="/items">Items</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>

      <div className='buttons'>
        {!isAuthenticated ? (
          <>
            <Link className='login_bt' to="/login">Login</Link>
            <Link className='signin_bt' to="/signup">Sign Up</Link>
          </>
        ) : (
          <>
            <Link className='account' to="/profile">My Account</Link>
            {isAdmin && <Link className='adminboard' to="/AdminDashboard">Admin board</Link>}
            <button className='logout' onClick={handleLogout}>Logout</button>
          </>
        )}
        <Link to='/cart'><img className='cart_icon' src={cart} alt="Cart" /></Link>
      </div>
    </div>
  );
}

export default NavBar;