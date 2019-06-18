import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTracks } from '../actions/actions'
import { SELECT_ALBUM, REMOVE_FAVORITE, ADD_FAVORITE } from '../constants/actionTypes';
import Track from './Track';
import SearchHeader from './SearchHeader';
import Footer from './Footer';
import '../css/Album.css'

class Album extends Component {
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
      this.props.getTracks(this.props.album);
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

  render() {
    let tracks;
    let tracksList;
    if (this.props.tracks) {
      tracks = this.props.tracks;
      console.log(this.props.tracks);
      tracksList = tracks.map((item, i) => {
        return (
            <Track key={i} track={item} onFavoriteClick={this.handleFavorite} onSongClick={this.handleAudio} favorite={this.props.favorites.includes(item.id)}/>
        );
      })
    }
    else {
      tracks = null;
    }

    return (
      <div>
        <SearchHeader />
        <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/"><span>Home</span></Link></li>
                  <li className="breadcrumb-item"><Link to="/artists"><span>Artists</span></Link></li>
                  <li className="breadcrumb-item"><Link to={{pathname: '/artist', state: { artistId: this.props.artist }}}><span>Artist</span></Link></li>
                  <li className="breadcrumb-item active" aria-current="page"><span>{this.props.location.state.albumName}</span></li>
                </ol>
              </nav>
        <div className="table-container">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-dark table-sm">
              <thead className="thead-light">
                <tr>
                  <th scope="col">CD1</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {tracksList}
              </tbody>
            </table>
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
    tracks: state.selectedAlbumTracks,
    favorites: state.favoriteTracksIds
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTracks: (id) => dispatch(getTracks(id)),
    selectAlbum: (payload) => { dispatch({type: SELECT_ALBUM, payload: payload}) },
    removeFavorite: (id) => { dispatch({ type: REMOVE_FAVORITE, payload: id})},
    addFavorite: (id) => { dispatch({ type: ADD_FAVORITE, payload: id})}
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Album);