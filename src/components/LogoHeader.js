import React from 'react';
import { Link } from 'react-router-dom'
import '../css/LogoHeader.css';

/* Component that simply displays a header with the logo
   and clicking in the logo redirects to Home. */
function LogoHeader(props) {
  return (
    <nav className='navbar navbar-expand-lg justify-content-center'>
      <Link to={{pathname: '/'}}>
        <img src={require('../assets/HeaderLogo.jpg')} />
      </Link>
    </nav>
  )
}
export default LogoHeader;