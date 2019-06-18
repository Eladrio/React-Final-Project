import React, { Component } from 'react';
import { connect } from "react-redux";
import { getAlbums } from '../actions/actions'
import { SELECT_ARTIST } from '../constants/actionTypes';
import Artist from './Artist';

class ArtistContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("ADENTRO DE COMPONENT DID MOUNT");
      this.props.selectArtist(this.props.location.state.artistId);
  }

  componentDidUpdate(prevProps) {
    console.log("ADENTRO DE COMPONENT DID UPDATE");
    if (this.props.artistId !== prevProps.artistId) {
      this.props.getAlbums(this.props.artistId);
    }
  }

  render() {
/*     let selection = [];
    if (this.props.albums.length) {
      selection= this.props.albums.map((item,i) => {
        let alt = `Image of ${item.name}`
        return(
          <div className="col-sm-6 " key={i}>
            <div className="card shadow p-3 mb-5 bg-white rounded" >
              <Link to={{pathname: '/album', state: { albumId: item.id, albumImg: item.img, albumName: item.name }}}>
                <div className="row">
                  <div className="col">
                    <img className="card-img img-fluid" src={item.img.url} alt={item.name}></img>
                  </div>
                  <div className="col-8">
                    <h4>{item.name}</h4>
                    <h4>{item.release}</h4>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          );
      });
    } */
    console.log("ADENTRO DE RENDER");
    console.log(this.props);
    console.log(this.props.albums.length);
    console.log(this.props.artistInfo);
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
    getAlbums: (id) => dispatch(getAlbums(id)),
    selectArtist: (payload) => { dispatch({type: SELECT_ARTIST, payload: payload}) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistContainer);