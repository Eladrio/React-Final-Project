import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

class ArtistsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const selection= this.props.artistsSearchResult.map((item,i) => {
      let alt = `Image of ${item.name}`
      let image = (item.img)
        ?
          image = <img src={item.img.url} className="img-fluid" alt={alt}/>
        :
          image = <img className="img-fluid" src={require('../assets/no-image.jpg')} alt={alt}/>
      return(
        <div className="col-sm-6 " key={i}>
            <div className="card shadow p-3 mb-5 bg-white rounded" >
            <Link to={{pathname: '/artist', state: { artistId: item.id }}}>
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
    return(
      <div className="container">
        <div className="row">
          <div className="container">
            <h4> Artists </h4>
            <p> you are currently searching: {this.props.searchInputText}</p>
          </div>
        </div>
        <div className="row">
          {selection}
        </div>
      </div>
    )
    }
  }


const mapStateToProps = (state) => {
  return {
    searchInputText: state.searchText,
    artistsSearchResult: state.artistsSearchResult
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsList);