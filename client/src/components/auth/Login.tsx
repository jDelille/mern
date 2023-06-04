import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './auth.scss';
import Input from '../input/Input';
const Login = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  try {
   await axios.post('/http://localhost:5000/', {
    email,
    password
   }).then((res) => {
    if (res.data === "This email is already in use.") {
     console.log('redirect to homepage')
    }
   })
  } catch (error) {
   console.log(error)
  }
 }

 return (
  <div className='auth-container'>
   <div className='header'>
    <h1>Sign In</h1>
   </div>
   <form action='POST' onSubmit={handleSubmit}>
    <Input
     id='email'
     type='text'
     label='Email'
     placeholder='something@email.com'
     value={email}
     onChange={(e) => setEmail(e.target.value)}
    />
    <Input
     id='password'
     type='password'
     label='Password'
     placeholder='********'
     value={password}
     onChange={(e) => setPassword(e.target.value)}
    />
    <button type='submit'>Login</button>
    <p>or</p>
    <Link to='/signup'>Create an account</Link>
   </form>
  </div>
 );
};

export default Login;
