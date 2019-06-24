import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import SearchBarContainer from './SearchBarContainer';
import { makeApiFetch, getArtistsAction } from '../actions/actions';
import LogoHeader from './LogoHeader';
import Footer from './Footer';
import SearchHeader from './SearchHeader';
import '../css/ArtistsList.css'

/* It handles the list of artists resulting of the text inserted in the
   search input */
class ArtistsList extends Component {
  constructor(props) {
    super(props);
  }

  /* When the component has mounted gets the data of the artists that returned
     the search query */
  componentDidMount() {
    const searchQuery = `search?q=${this.props.searchInputText}&type=artist&limit=4`;
    const url = 'https://api.spotify.com/v1/' + searchQuery;
    this.props.makeApiFetch(url, getArtistsAction);
  }

  /* When the component has updated gets the new Artists's data if the searchInput has
     changed */
  componentDidUpdate(prevProps) {
    if (this.props.searchInputText !== prevProps.searchInputText) {
      const searchQuery = `search?q=${this.props.searchInputText}&type=artist&limit=4`;
      const url = 'https://api.spotify.com/v1/' + searchQuery;
      this.props.makeApiFetch(url, getArtistsAction);
    }
  }


  render() {
    let selection;
    let rows = [];
    if (this.props.artistsIds) {
      selection= this.props.artistsIds.map((item,i) => {
        let artist = this.props.artistsSearchResult[item];
        let alt = `Image of ${artist.name}`
        return(
          <div className="col-sm-6 h-100" key={i}>
              <div className="card shadow p-3 mb-5 h-75 bg-white rounded" >
              <Link to={{pathname: '/artist', state: { artistId: artist.id}}}>
                <div className="row">
                  <div className="col img-col">
                    <img src={artist.img} className="card-img h-75" alt={alt}/>
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
      for (let i = 0; i < selection.length; i = i + 2) {
        let currentElement = selection[i];
        let nextElement = selection[i + 1];
        let row = <div className="row" key={i}>
            {currentElement}
            {nextElement}
          </div>;
        rows.push(row);
      }
    }
    return(
      <div className="page-container">
        <div className="hide-mobile">
          <LogoHeader />
        </div>
        <div className="hide-desktop">
          <SearchHeader />
        </div>
        <div className="content-wrap">
          <div className="container">
            <div className="row">
              <div className="container">
                <h4> Artists </h4>
                <p> You are currently searching: "{this.props.searchInputText}"</p>
                <div className="row hide-mobile">
                  <div className="searchbar-container col-md-8">
                    <SearchBarContainer placeholderText="Search for your favorite artist here" />
                  </div>
                </div>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/"><span>Home</span></Link></li>
                    <li className="breadcrumb-item active" aria-current="page"><span>Artists</span></li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <div className="line-separator my-5"></div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-sm-8">
                  {rows}
                </div>
              </div>
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