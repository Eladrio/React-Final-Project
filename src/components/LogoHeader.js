import React from 'react';
import { Link } from 'react-router-dom'
import '../css/LogoHeader.css';

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


{/*     <!-- Mobile -->
    <div class="collapse" id="navbarMobile">
        <ul class="nav navbar-nav">
          <li class="nav-item">
              <a class="nav-link" href="#">Mobile Link</a>
          </li>
          <li class="nav-item">
                <a class="nav-link" href="#">Mobile Link</a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="#">Mobile Link</a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="#">Mobile Link</a>
          </li>
          <li class="nav-item">
                <a class="nav-link" href="#">Mobile Link</a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="#">Mobile Link</a>
          </li>
        </ul>
    </div> */}
