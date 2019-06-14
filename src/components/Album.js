import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { FETCH_TRACKS } from '../actions/actions';

class Album extends Component {
  constructor(props) {
    super(props);
  }
}

const mapStateToProps = (state) => {
  return {
    artist: state.artistSelectedId,
    albums: state.trackSearchResult
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);