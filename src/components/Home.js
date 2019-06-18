import React, { Component } from 'react';
import SearchBarContainer from './SearchBarContainer';
import LogoHeader from './LogoHeader'
import '../css/Home.css'
import Footer from './Footer';
import { connect } from 'react-redux';
import FavoritesList from './FavoritesList';

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(input) {
    this.props.getArtists(input);
  }

  render() {
    return(
      <div>
        <div>
          <LogoHeader />
        </div>
        <div className='main-container'>
          <div className='intro-text-container justify-center col-sm-8'>
            <h2>Welcome to</h2>
            <h1>Spotisearch</h1>
            <p>Search your favourite songs over Spotify, just enter
            an artist's name in the following search box and enjoy!</p>
            <SearchBarContainer handleInput={this.handleInput} />
          </div>
          <div>
            {this.props.favoritesId.length ? <FavoritesList props={{favorites: this.props.favorites, favoritesId: this.props.favoritesId}} />: null}
          </div>
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

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);