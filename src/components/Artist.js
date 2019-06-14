import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { getAlbums, SELECT_ALBUM } from '../actions/actions';

class Artist extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAlbums(this.props.artist);
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
                <Link to="/album" onClick={() => {this.props.selectAlbum(item.id)}} >
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
  return {
    artist: state.artistSelectedId,
    albums: state.albumsSearchResult
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAlbums: (id) => dispatch(getAlbums(id)),
    selectAlbum: (payload) => { dispatch({type: SELECT_ALBUM, payload: payload}) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Artist);