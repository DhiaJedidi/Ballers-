import React from 'react'
import './loginpage.css'
import { useState } from 'react'
import axios from 'axios';
import { useHistory  } from 'react-router-dom';

function Signinpage() {
  const  [name , setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory()
  
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:3001/signin',{name,email, password})
    .then(result => {
      console.log(result)
      localStorage.setItem('token', result.data.token);
      window.dispatchEvent(new Event("storage"));
      history.push('/');
   })
    .catch(err =>console.log(err))
  }

  const alreadyMember = (e) =>{
    e.preventDefault()
    history.push('/login')

  }

  return (
    <div className='formcontainer'>
      <form onSubmit={handleSubmit}>
    

         <h1>Sign In</h1>
        <input id='nameinput' type="text" placeholder='your name :  ' className='namesg' onChange={(e) => setName(e.target.value)}/>
         <input id='emailinput' type="email" placeholder='your email : ' className='login' onChange={(e) => setEmail(e.target.value)}/> 
        <input id='pswrdinput' type="password" placeholder='your password : ' className='login' onChange={(e) => setPassword(e.target.value)}/>
        <div className='rme'>
        <input type="checkbox" className='rmbr' />
        <label htmlFor="rmbr">Remeber me </label>
        </div>
         <button className='sub2' type='submit'> sign up </button>
         <div className='notamember' >
         <p>already a member ? </p><a className='signup' onClick={alreadyMember}>login</a>
         </div>
      </form>
    </div>
  )
}

export default Signinpage
