import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../input/Input';
import './auth.scss';

const Login = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState("");

 const history = useNavigate()

 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  try {
   await axios.post('http://localhost:5000/auth/login', {
    email,
    password
   }).then((res) => {

    if (res.data.message === 'User does not exist') {
     return setError(res.data.message)
    }

    if (res.data.message === 'Wrong email and password combination') {
     return setError(res.data.message)
    }
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('userId', res.data.userID);

    return history('/')
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
   {error && <p>{error}</p>}
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
