import { Link, useNavigate } from 'react-router-dom';
import './navbar.scss';

const Navbar = () => {
 const history = useNavigate()

 const token = localStorage.getItem('token');

 const isAuthenticated = !!token;

 async function handleLogout() {
  localStorage.removeItem('token');
  history('/')
 }

 return (
  <div className='navbar'>
   <div>Logo</div>
   <div className='nav-links'>
    {!isAuthenticated && (
     <>
      <Link to='/login' className='link'>Login</Link>
      <Link to='/signup' className='link'>Sign up</Link>
     </>
    )}
    {isAuthenticated && (
     <button onClick={handleLogout} className='link'>Logout</button>
    )}
   </div>
  </div>
 );
}

export default Navbar;