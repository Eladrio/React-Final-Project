import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTracksAction, makeApiFetch } from '../actions/actions'
import { SELECT_ALBUM, REMOVE_FAVORITE, ADD_FAVORITE } from '../constants/actionTypes';
import SearchHeader from './SearchHeader';
import Footer from './Footer';
import Album from './Album';

class AlbumContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: new Audio(),
    }
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleAudio = this.handleAudio.bind(this);
  }

  componentDidMount() {
    this.props.selectAlbum(this.props.location.state.albumId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.album !== prevProps.album) {
      const url = `https://api.spotify.com/v1/albums/${this.props.album}/tracks`;
      this.props.makeApiFetch(url, getTracksAction);
    }
  }

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

  handleAudio(previewUrl) {
    if (previewUrl) {
      if (this.state.audio.src !== previewUrl) {
        this.state.audio.pause();
      }
      if (this.state.audio.paused) {
        this.state.audio.src = previewUrl;
        this.state.audio.load();
        this.state.audio.play();
      } else {
        this.state.audio.pause();
      }
    }
  }

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
    if (this.props.tracks) {
      tracks = this.props.tracks;
      tracksByDisc = this.separateByDiscNumber(tracks);
    }
    else {
      tracks = null;
    }
    return (
       <div>
        <SearchHeader />
        <div className="container">
          <div className="card shadow p-3 mb-5 bg-white rounded" >
            <div className="row">
              <div className="col">
                <img className="card-img img-fluid" src={this.props.location.state.albumImg.url} alt={this.props.location.state.albumName} />
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
          {tracks !== null ? <Album tracks={tracksByDisc} handleFavorite={this.handleFavorite} handleAudio={this.handleAudio} favorites={this.props.favorites} /> : null}
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