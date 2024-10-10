import React, { useState } from 'react';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';

function Login() {

    const navigate=useNavigate();

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  async function handleSubmit(event){

    event.preventDefault();
    try{
        await axios.post('http://localhost:8000/',{email,password})
        .then(res=>{
            if(res.data==="User exists"){
                    navigate('/home')
            }
            else if(res.data==="User does not exist"){
                alert("user doesn't exist");
            }
        })
        .catch(e=>{
            alert("wrong details");
            console.log(e);
        })

    }
    catch(err){
        console.log(err)
    }

  }


  return (
    <div className='body'>
        <div className="container" id="container">
                <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <div className='sign-in'>
                            <div>
                            <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                            <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="password"/>
                            </div>
                        </div>
                        <a href="#" className="a1"><p>Forget your password?</p></a>
                        <Link to={'/register'} className="a1"><p>Create Account</p></Link>
                        <div className='btn'>
                            <button type="submit">Sign In</button>
                        </div>
                </form>
    
        </div>

    </div>

  )
}

export default Login
