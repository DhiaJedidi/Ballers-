import React, { useState } from 'react';
import './loginpage.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Use `useHistory` instead of `useNavigate` (v5)


function LoginAdmin() {
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
      const result = await axios.post('http://localhost:3001/loginadmin', {                                                                                                                                       
        email,
        password
      });
      const expirationTime = Date.now() + 1000 ;
      if (result.data === "success") {
        
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('role', 'admin');
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
  const goBack = (e) =>{
    e.preventDefault()
    history.push('/signinadmin')
  }
  const goToSignupAdmin = (e) => {
    e.preventDefault();
    history.push('/signinadmin'); // Use `history.push` (v5)
  };


  return (
          


    <div className='formcontainer'>
      <form onSubmit={handleSubmit} className='loginform'>


         <h1>Admin Login</h1>
         <input id='emailinput' type="email" placeholder='your email : ' className='login' onChange={(e) => setEmail(e.target.value)}/> 
         <input id='pswrdinput' type="password" placeholder='your password : ' className='login' onChange={(e) => setPassword(e.target.value)}/>
        <div className='rme'>
        <input type="checkbox" className='rmbr' />
        <label htmlFor="rmbr">Remeber me </label>
        <a href="" className='forgetpswrd'>forget me ?</a>
        </div>
         <input className='sub2' type="submit" value={"Login"} />
         <div className='notamember'>
          <p>don't have an account ? </p>
          <a className='signup' onClick={goToSignupAdmin}>Sign up now</a>
        </div>

      </form>
        {/* password Popup */}
        {showPopupE && (
        <div className="popup">
          <div className="popup-content">
            <p>Invalid Email. Please try again.</p>
            <button onClick={() => setShowPopupE(false)}>Close</button>
          </div>
        </div>
      )}
        {/* password Popup */}
        {showPopupPswd && (
        <div className="popup">
          <div className="popup-content">
            <p>Invalid password. Please try again.</p>
            <button onClick={() => setShowPopupPswd(false)}>Close</button>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default LoginAdmin
