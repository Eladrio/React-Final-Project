import React from 'react';

/* Handles the presentation of the favorites list */
function FavoritesList(props) {
  let tracks = props.props.favoritesId.map((item,i) => {
    let favItem = props.props.favorites[item];
    return (
      <div className="col-sm-6" key={i}>
        <div className="card shadow p-3 mb-5 h-75 bg-white rounded" >
          <div className="row">
            <div className="col">
              <img className="card-img h-75" src={favItem.albumImg} alt="Card image cap" />
            </div>
            <div className="col-8">
              <h4>{favItem.name}</h4>
              <p className="hide-mobile">Artist: {favItem.artist}</p>
              <p className="hide-mobile">Album: {favItem.albumName}</p>
            </div>
          </div>
        </div>
      </div>
    )
  });
  let rows = [];
  for (let i = 0; i < tracks.length; i = i + 2) {
    let currentElement = tracks[i];
    let nextElement = tracks[i + 1];
    let row = <div className="row" key={i}>
        {currentElement}
        {nextElement}
      </div>;
    rows.push(row);
  }
  return (
    <div className="favorites-container">
      <div className="row justify-content-center">
        <div className="col-sm-8">
          <h2>Favorites</h2>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-sm-8">
          {rows}
        </div>
      </div>
    </div>
  )
}

export default FavoritesList;