import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTracksAction, makeApiFetch } from '../actions/actions'
import { SELECT_ALBUM, REMOVE_FAVORITE, ADD_FAVORITE } from '../constants/actionTypes';
import SearchHeader from './SearchHeader';
import Footer from './Footer';
import Album from './Album';

/* This component manages the logic of the selected artist's albums and pass props to
   the Album component to manage the view of the albums  */
class AlbumContainer extends Component {
  constructor(props) {
    super(props);
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  /* When the component finished mounting it sets the selectedAlbumId in the store
     to the id of selected Album. */
  componentDidMount() {
    this.props.selectAlbum(this.props.location.state.albumId);
  }

  /* When the component did update checks if the current album's id is different than
     the previous album's id and if so fetchs the new album's data. */
  componentDidUpdate(prevProps) {
    if (this.props.album !== prevProps.album) {
      const url = `https://api.spotify.com/v1/albums/${this.props.album}/tracks`;
      this.props.makeApiFetch(url, getTracksAction);
    }
  }

  /* Receives info of a song and if it is already in favorites then removes it otherwise
     adds the song to the favorites songs */
  handleFavorite(trackData) {
    if (this.props.favorites.includes(trackData.id)) {
      this.props.removeFavorite(trackData.id);
    }
    else {
      let data = {
        id: trackData.id,
        trackData: {
          name: trackData.name,
          artist: trackData.artist,
          albumImg: this.props.location.state.albumImg,
          albumName: this.props.location.state.albumName
        }
      }
      this.props.addFavorite(data);
    }
  }

  /* Receives the tracks of the Album and creates an array of arrays that separates them
     by disc number */
  separateByDiscNumber(tracks){
    let discCounter = 1;
    let separatedDiscs = [];
    separatedDiscs.push([]);
    tracks.forEach((item) => {
      if (discCounter < item.disc_number) {
        separatedDiscs.push([]);
        discCounter++;
      }
      separatedDiscs[discCounter - 1].push(item);
    });
    return separatedDiscs;
  }

  render() {
    let tracks;
    let tracksByDisc;
    console.log(this.props);
    if (this.props.tracks) {
      tracks = this.props.tracks;
      tracksByDisc = this.separateByDiscNumber(tracks);
    }
    else {
      tracks = null;
    }
    console.log(this.props.location.state);
    return (
       <div className="page-container">
        <SearchHeader />
        <div className="content-wrap">
          <div className="container album-container">
            <div className="card artist-card p-3 mb-5 rounded border-0" >
              <div className="row">
                <div className="col">
                  <img className="card-img img-fluid" src={this.props.location.state.albumImg} alt={this.props.location.state.albumName} />
                </div>
                <div className="col-8">
                  <h3>{this.props.location.state.albumName}</h3>
                  <h3>{this.props.artistInfo.name} - {this.props.location.state.albumRelease}</h3>
                </div>
              </div>
            </div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/"><span>Home</span></Link></li>
                <li className="breadcrumb-item"><Link to="/artists"><span>Artists</span></Link></li>
                <li className="breadcrumb-item"><Link to={{pathname: '/artist', state: { artistId: this.props.artist }}}><span>Artist</span></Link></li>
                <li className="breadcrumb-item active" aria-current="page"><span>{this.props.location.state.albumName}</span></li>
              </ol>
            </nav>
          </div>
            <div className="line-separator my-5"></div>
            <div className="container">
              {tracks !== null ? <Album tracks={tracksByDisc} handleFavorite={this.handleFavorite} favorites={this.props.favorites} /> : null}
            </div>
        </div>
        <Footer />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    album: state.albumSelectedId,
    artist: state.artistSelectedId,
    artistInfo: state.artistSelectedInfo,
    tracks: state.selectedAlbumTracks,
    favorites: state.favoriteTracksIds
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    makeApiFetch: (url, callback) => dispatch(makeApiFetch(url, callback)),
    selectAlbum: (payload) => { dispatch({type: SELECT_ALBUM, payload: payload}) },
    removeFavorite: (id) => { dispatch({ type: REMOVE_FAVORITE, payload: id})},
    addFavorite: (id) => { dispatch({ type: ADD_FAVORITE, payload: id})}
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AlbumContainer);