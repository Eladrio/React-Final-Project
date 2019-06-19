import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import SearchBarContainer from './SearchBarContainer';
import { makeApiFetch, getArtistsAction } from '../actions/actions';
import LogoHeader from './LogoHeader';
import Footer from './Footer';

class ArtistsList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const searchQuery = `search?q=${this.props.searchInputText}&type=artist&limit=4`;
    const url = 'https://api.spotify.com/v1/' + searchQuery;
    this.props.makeApiFetch(url, getArtistsAction);
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchInputText !== prevProps.searchInputText) {
      const searchQuery = `search?q=${this.props.searchInputText}&type=artist&limit=4`;
      const url = 'https://api.spotify.com/v1/' + searchQuery;
      this.props.makeApiFetch(url, getArtistsAction);
    }
  }


  render() {
    let selection;
    if (this.props.artistsIds) {
      selection= this.props.artistsIds.map((item,i) => {
        let artist = this.props.artistsSearchResult[item];
        let alt = `Image of ${artist.name}`
        return(
          <div className="col-sm-6 " key={i}>
              <div className="card shadow p-3 mb-5 bg-white rounded" >
              <Link to={{pathname: '/artist', state: { artistId: artist.id}}}>
                <div className="row">
                  <div className="col">
                    <img src={artist.img} className="img-fluid" alt={alt}/>
                  </div>
                  <div className="col-8">
                    <h4>{artist.name}</h4>
                  </div>
                </div>
              </Link>
              </div>
          </div>
        );
      });
    }
    return(
      <div>
        <div>
          <LogoHeader />
        </div>
        <div className="container">
          <div className="row">
            <div className="container">
              <h4> Artists </h4>
              <p> you are currently searching: "{this.props.searchInputText}"</p>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/"><span>Home</span></Link></li>
                  <li className="breadcrumb-item active" aria-current="page"><span>Artists</span></li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="row">
            <SearchBarContainer />
          </div>
          <div className="row">
            {selection}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    searchInputText: state.searchText,
    artistsSearchResult: state.artistsSearchResult,
    artistsIds: state.artistsIds
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    makeApiFetch: (url, callback) => dispatch(makeApiFetch(url, callback))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsList);