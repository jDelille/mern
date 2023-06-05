import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../input/Input';
import './auth.scss';
import Button from '../button/Button';

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

    if (res.data.message === 'User does not exist.') {
     return setError(res.data.message)
    }

    if (res.data.message === 'Invalid E-mail address or password.') {
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
    <h1>Login to Bweem.io</h1>
    <p>Login with your <span>Bweem.io</span> credentials. If you don't have an account yet, you can create a free one to get started.</p>
   </div>
   {error && <div className='error'>
    <strong>{error}</strong></div>}
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
    <Button label='Log in' />
    <div className='footer'>
     <Link to='/signup'>Create an account</Link>
    </div>
   </form>
  </div>
 );
};

export default Login;
