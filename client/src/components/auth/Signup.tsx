import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import Input from '../input/Input';
import './auth.scss';

const Signup = () => {
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');


 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  try {
   await axios.post('http://localhost:5000/auth/signup', {
    name: name,
    email: email,
    password: password
   })
  } catch (error) {
   console.log(error)
  }
 }

 return (
  <div className='auth-container'>
   <div className='header'>
    <h1>Create an account</h1>
   </div>

   <form action='POST' onSubmit={handleSubmit}>
    <Input
     type="text"
     label='Name'
     id='name'
     onChange={(e) => setName(e.target.value)}
     placeholder="John Smith"
     value={name}
    />
    <Input
     type="text"
     label='Email'
     id='email'
     onChange={(e) => setEmail(e.target.value)}
     placeholder="something@email.com"
     value={email}
    />
    <Input
     type="password"
     label='Password'
     id='password'
     onChange={(e) => setPassword(e.target.value)}
     placeholder="********"
     value={password}
    />
    <button type='submit'>Signup</button>
    <p>or</p>
    <Link to='/login'>Already have an account?</Link>
   </form>
  </div>
 );
};

export default Signup;
