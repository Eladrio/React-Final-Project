import React from 'react'


function Track(props) {

  function handleFavoriteClick() {
    let trackData = {
      id: props.track.id,
      name: props.track.name,
      artist: props.track.artists[0].name
    }
    props.onFavoriteClick(trackData);
  }
  let favorite = props.favorite;
  let tooltipTitle = '';
  if (favorite) {
    tooltipTitle = "Remove from favorites";
  }
  else {
    tooltipTitle = "Add to favorites";
  }
  return(
    <tr>
      <td className="td-name" onClick={()=>{props.onSongClick(props.track.preview_url)}}>{props.track.name}</td>
      <td className="td-fav text-right">
        <a onClick={handleFavoriteClick} data-toggle="tooltip" data-placement="right" title={tooltipTitle} >
          <i className={`${favorite ? 'fas fa-star' : 'far fa-star'}`}></i>
        </a>
      </td>
    </tr>
  )
}

export default Track;