import React from 'react';
import SearchBarContainer from './SearchBarContainer';
import { Link } from 'react-router-dom'
import '../css/SearchHeader.css';

/* Displays the Header with a logo and a searchbar */
function SearchHeader(props) {
  return (
    <div className="header-container">
      <div className="navbar navbar-dark navbar-fixed-top search-nav">
        <button className="btn navbar-toggler visible-only-mobile" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
          <span ><i className="fas fa-search"></i></span>
        </button>
        <Link to={{pathname: '/'}}>
          <img src={require('../assets/HeaderLogo.jpg')} />
        </Link>
        <div className="pos-f-t collapse dont-collapse-sm" id="navbarToggleExternalContent">
          <div className="p-4">
            <ul className="nav navbar-nav">
              <li><SearchBarContainer placeholderText="Search for another artist" /></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  )
}

export default SearchHeader;

