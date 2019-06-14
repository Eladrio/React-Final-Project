import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { getAlbums } from '../actions/actions'
import { SELECT_ARTIST } from '../constants/actionTypes';

class Artist extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const artistId = this.props.location.state.artistId;
    this.props.selectArtist(artistId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.artist !== prevProps.artist) {
      this.props.getAlbums(this.props.artist);
    }
  }

  render() {
    let selection = [];
    if (this.props.albums.length) {
      selection= this.props.albums.map((item,i) => {
        let alt = `Image of ${item.name}`
        let image = (item.img)
          ?
            image = <img src={item.img.url} className="img-fluid" alt={alt}/>
          :
            image = <img className="img-fluid" src={require('../assets/no-image.jpg')} alt={alt}/>
        return(
          <div className="col-sm-6 " key={i}>
              <div className="card shadow p-3 mb-5 bg-white rounded" >
                <Link to={{pathname: '/album', state: { albumId: item.id }}}>
                <div className="row">
                  <div className="col">
                    {image}
                  </div>
                  <div className="col-8">
                    <h4>{item.name}</h4>
                  </div>
                </div>
              </Link>
              </div>
          </div>
        );
      });
    }
    return(
      <div className="container">
        <div className="row">
          {selection}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    artist: state.artistSelectedId,
    albums: state.albumsSearchResult
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAlbums: (id) => dispatch(getAlbums(id)),
    selectArtist: (payload) => { dispatch({type: SELECT_ARTIST, payload: payload}) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Artist);