// 
import React, { useState } from 'react';
import './loginpage.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Use `useHistory` instead of `useNavigate` (v5)

function Loginpage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPopupPswd, setShowPopupPswd] = useState(false);
  const [showPopupE, setShowPopupE] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory(); // React Router v5 syntax

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setShowPopupE(true);
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post('http://localhost:3001/login', {                                                                                                                                       
        email,
        password
      });
      const expirationTime = Date.now() + 1000 *60;

      if (result.data === "success") {
        
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('role', 'user');
        localStorage.setItem('email', email); // ✅ Save the email separately
        localStorage.setItem('token_expiry', expirationTime);
        window.dispatchEvent(new Event("storage"));
        history.push('/');

      } else if (result.data === "invalid email") {
        setShowPopupE(true);
      } else {
        setShowPopupPswd(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setShowPopupE(true);
    } finally {
      setLoading(false);
    }
  };

  const goToSignup = (e) => {
    e.preventDefault();
    history.push('/signup'); // Use `history.push` (v5)
  };

  const goToAdminSignup = (e) => {
    e.preventDefault();
    history.push('/AdminLogin'); // Use `history.push` (v5)
  };

  return (
    <div className='formcontainer'>
      <form onSubmit={handleSubmit} className='loginform'>
        <h1>Login</h1>
        
        <input
          id='emailinput'
          type="email"
          placeholder='Your email'
          className='login'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input
          id='pswrdinput'
          type="password"
          placeholder='Your password'
          className='login'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <div className='rme'>
          <input type="checkbox" className='rmbr' id="rmbr" />
          <label htmlFor="rmbr">Remember me</label>
          <a href="/forgot-password" className='forgetpswrd'>Forgot password?</a>
        </div>
        
        <button 
          className='sub2' 
          type="submit" 
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        
        <div className='notamember'>
          <p>Not a member? </p>
          <a className='signup' onClick={goToSignup}>Sign up now</a>
        </div>
        <div className='asadmin'>
          <p> login in as an admin </p>
          <a className='signup' onClick={goToAdminSignup}>Admin login</a>
        </div>
      </form>

      {/* Error Popups */}
      {showPopupE && (
        <div className="popup">
          <div className="popup-content">
            <p>Invalid email or password. Please try again.</p>
            <button onClick={() => setShowPopupE(false)}>Close</button>
          </div>
        </div>
      )}
      
      {showPopupPswd && (
        <div className="popup">
          <div className="popup-content">
            <p>Incorrect password. Please try again.</p>
            <button onClick={() => setShowPopupPswd(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Loginpage;