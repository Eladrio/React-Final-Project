import React, { Component } from 'react';
import { connect } from "react-redux";
import { makeApiFetch, getAlbumsAction } from '../actions/actions'
import { SELECT_ARTIST } from '../constants/actionTypes';
import Artist from './Artist';

/* This component manages the logic of the selected Artist and pass the
   necessary data to the Artist's component that handles the presentation
   of an artist */
class ArtistContainer extends Component {
  constructor(props) {
    super(props);
  }

  /* When the component has mounted sets the artistId in the store */
  componentDidMount() {
      this.props.selectArtist(this.props.location.state.artistId);
  }

  /* When the component has been updated if the new id is different to
     the previous one then gets the new artist data */
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