import React from 'react';
import Track from './Track';
import '../css/Album.css'

function Album(props) {
  let tables = props.tracks.map((cd,i) => {
    let tracksList = cd.map((item, i) => {
      return (
          <Track key={i} track={item} onFavoriteClick={props.handleFavorite} onSongClick={props.handleAudio} favorite={props.favorites.includes(item.id)} />
      );
    });
    return(
      <div className="table-container" key={i}>
        <div className="table-responsive">
          <table className="table table-striped table-hover table-dark table-sm">
            <thead className="thead-light">
              <tr>
                <th scope="col">CD {i + 1}</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {tracksList}
            </tbody>
          </table>
        </div>
      </div>
    )
  })

  return(
    <div className="tables-container">
      {tables}
    </div>
  )
}

export default Album;