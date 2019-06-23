import React, { Component } from 'react';
import SearchBarContainer from './SearchBarContainer';
import LogoHeader from './LogoHeader'
import '../css/Home.css'
import Footer from './Footer';
import { connect } from 'react-redux';
import FavoritesList from './FavoritesList';

/* Shows the Home view and handles the conditional rendering of the favorite's list */
class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="page-container">
        <div>
          <LogoHeader />
        </div>
        <div className="main-container content-wrap container">
          <div className="header">
            <div className="row">
              <div className="intro-text-container col-md-8">
                <h2>
                  Welcome to
                </h2>
                <h1>
                  Spotisearch
                </h1>
                <h3>
                  Search your favourite songs over Spotify, just enter
                  an artist's name in the following search box and enjoy!
                </h3>
              </div>
            </div>
            <div className="row">
              <div className="searchbar-container col-md-8">
                <SearchBarContainer />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          {/* If the favoritesId array lenght is greater than zero then renders the favorite's list */}
            {this.props.favoritesId.length ? <FavoritesList props={{favorites: this.props.favorites, favoritesId: this.props.favoritesId}} />: null}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    favoritesId: state.favoriteTracksIds,
    favorites: state.favoriteTracks
  }
}

export default connect(mapStateToProps, null)(Home);