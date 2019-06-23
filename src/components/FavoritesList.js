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
  return (
    <div className="favorites-container">
      <h2>Favorites</h2>
      <div className="row">
        {tracks}
      </div>
    </div>
  )
}

export default FavoritesList;