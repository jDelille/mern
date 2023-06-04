import { Link } from 'react-router-dom';
import './navbar.scss';

const Navbar = () => {
 return (
  <div className='navbar'>
   <div>Logo</div>
   <div className='nav-links'>
    <Link to='/signup' className='link'>Sign up</Link>
    <Link to='/login' className='link'>Login</Link>
   </div>
  </div>
 );
}

export default Navbar;