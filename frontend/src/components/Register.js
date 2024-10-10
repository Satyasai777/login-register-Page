import React,{useState} from 'react';
import './Register.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [userName,setuserName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('')
  const navigate=useNavigate();

  async function handlesubmit(e){
      e.preventDefault();
      try{
        await axios.post('http://localhost:8000/register',{userName,email,password})
        .then(res=>{
            if(res.data==="User already exists"){
                    alert("User already exists");
                    navigate('/')
            }
            else {
                alert("User registered successfully")
                navigate('/')
            }
        })
        .catch(e=>{
            console.log(e);
        })
    //     .then(res=>navigate('/')
    // "User already exists")
    //     .catch(err=>console.log(err))
    //     navigate('/')
    //   }
    //   catch(err){
    //         console.log(err)
    //   }
  }
  catch(e){
    console.log(e)
  }
}
  return (
    <div className='body'>
      <div className="container">
        <form onSubmit={handlesubmit}>
            <h1>Create Account</h1>
            <p>use your email for registration</p>
            <div className='sign-up'>
                <div>
                    <input type="text" onChange={e=>setuserName(e.target.value)} placeholder="Name"/>
                    <input type="email" onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
                    <input type="password" onChange={e=>setPassword(e.target.value)} placeholder="password"/>
                </div>
            </div>
            <div className='btn'> 
            <button type="submit">Sign Up</button>
            </div>
        </form>
    </div>
    </div>
  )
}

export default Register;
