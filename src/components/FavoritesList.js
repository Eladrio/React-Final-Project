import React from 'react';

function FavoritesList(props) {
  console.log(props);
  let tracks = props.props.favoritesId.map((item,i) => {
    console.log(item);
    console.log(props.props.favorites[item]);
    let favItem = props.props.favorites[item];
    return (
      <div className="col-sm-6 " key={i}>
        <div className="card shadow p-3 mb-5 bg-white rounded" >
          <div className="row">
            <div className="col">
              <img className="card-img" src={favItem.albumImg.url} alt="Card image cap" />
            </div>
            <div className="col-8">
              <h4>{favItem.name}</h4>
              <h5>Artist: {favItem.artist}</h5>
              <h5>Album: {favItem.albumName}</h5>
            </div>
          </div>
        </div>
      </div>
    )
  });
  return (
    <div className="container">
      <div className="row">
        {tracks}
      </div>
    </div>
  )
}

export default FavoritesList;