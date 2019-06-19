import React, { Component } from 'react';
import { connect } from "react-redux";
import { makeApiFetch, getAlbumsAction } from '../actions/actions'
import { SELECT_ARTIST } from '../constants/actionTypes';
import Artist from './Artist';

class ArtistContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      this.props.selectArtist(this.props.location.state.artistId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.artistId !== prevProps.artistId) {
      const url = `https://api.spotify.com/v1/artists/${this.props.artistId}/albums`;
      this.props.makeApiFetch(url, getAlbumsAction);
    }
  }

  render() {
    let toReturn = this.props.albums.length && this.props.artistInfo ? <Artist albums={this.props.albums} artist={this.props.artistInfo} /> : null;
    return(
      toReturn
    )
  }
}

const mapStateToProps = (state) => {
  return {
    artistId: state.artistSelectedId,
    artistInfo: state.artistSelectedInfo,
    albums: state.albumsSearchResult
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    makeApiFetch: (url, callback) => dispatch(makeApiFetch(url, callback)),
    selectArtist: (payload) => { dispatch({type: SELECT_ARTIST, payload: payload}) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistContainer);