import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTracks } from '../actions/actions'
import { SELECT_ALBUM } from '../constants/actionTypes';

class Album extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.location.state.albumId);
    this.props.selectAlbum(this.props.location.state.albumId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.album !== prevProps.album) {
      this.props.getTracks(this.props.album);
    }
  }

  render() {
    let tracks;
    let tracksList;
    if (this.props.tracks.result) {
      tracks = this.props.tracks.result.response.items;
      tracksList = tracks.map((item, i) => {
        return (
          <a href={item.preview_url} key={i}><li>{item.name}</li></a>
        )
      })
    }
    else {
      tracks = null;
    }

    return (
      <div>
        <h1>Hello this is Album</h1>
        <ul>
          {tracksList}
        </ul>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    album: state.albumSelectedId,
    artist: state.artistSelectedId,
    tracks: state.selectedAlbumTracks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTracks: (id) => dispatch(getTracks(id)),
    selectAlbum: (payload) => { dispatch({type: SELECT_ALBUM, payload: payload}) }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Album);