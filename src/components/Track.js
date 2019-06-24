import React from 'react'
import Tooltip from 'react-tooltip-lite';

/* The Track component handles the presentation of a song inside the
   Album's table. */
function Track(props) {

  /* When the table cell containing the song's name is clicked plays
     the audio preview of the corresponding song */
  function onSongClick(previewUrl) {
    let audio = new Audio();
    audio.src = previewUrl;
    audio.play();
  }

  /* It handles the favorites star click sending info of the corresponding
     track to a parent component */
  function handleFavoriteClick() {
    let trackData = {
      id: props.track.id,
      name: props.track.name,
      artist: props.track.artists[0].name
    }
    props.onFavoriteClick(trackData);
  }
  /* if the song its in favorites shows the remove from tooltip's text
     otherwise shows the add to favorites text */
     let favorite = props.favorite;
     console.log(props.favorite);
     let tooltipTitle = '';
     if (favorite) {
       tooltipTitle = "Remove from favorites";
     }
     else {
       tooltipTitle = "Add to favorites";
     }
     return(
       <tr>
         <td className="td-name" onClick={() => onSongClick(props.track.preview_url)}>{props.track.name}</td>
         <td className="td-fav text-right">
          <Tooltip content={tooltipTitle} direction="right" useDefaultStyles forceDirection>
            <a onClick={handleFavoriteClick}>
              <i className={`${favorite ? 'fas fa-star' : 'far fa-star'}`}></i>
            </a>
          </Tooltip>
         </td>
       </tr>
     )
}

export default Track;