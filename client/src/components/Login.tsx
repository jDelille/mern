import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

 const history = useNavigate();

 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  try {
   await axios.post('http://localhost:5000/signup', {
    email,
    password
   }).then((res) => {
    if (res.data === "This email is already in use.") {
     history('/')
    }
   })
  } catch (error) {
   console.log(error)
  }
 }

 return (
  <div>
   <h1>Login</h1>
   <label htmlFor="email">Email</label>
   <form action='POST' onSubmit={handleSubmit}>
    <input
     id='email'
     type='text'
     onChange={(e) => setEmail(e.target.value)}
     value={email}
     placeholder='something@email.com'
    />
    <label htmlFor="password">Password</label>
    <input
     id='password'
     type='password'
     onChange={(e) => setPassword(e.target.value)}
     value={password}
     placeholder='********'
    />
    <button type='submit'>Login</button>
    <p>or</p>
    {/* <Link to='/signup'>Create an account</Link> */}
   </form>
  </div>
 );
};

export default Login;
