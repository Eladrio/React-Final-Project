import { FETCH_ARTISTS, SELECT_ARTIST, FETCH_ALBUMS, SELECT_ALBUM, FETCH_TRACKS, ADD_FAVORITE, REMOVE_FAVORITE } from "../constants/actionTypes";

export function getArtistsAction(data) {
  console.log(data);
  let artistsIds = [];
  let artists = {};
  if(data.response.artists.items) {
    data.response.artists.items.forEach(item => {
      console.log("ADENTRO DEL FOR EACH");
      let image;
      if (item.images.length) {
        image = item.images[0].url;
      }
      else {
        image = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Imagen_no_disponible.svg/1024px-Imagen_no_disponible.svg.png";
      }
      artistsIds.push(item.id);
      artists[item.id] = {
        id: item.id,
        img: image,
        name: item.name,
        genre: item.genres
      }
      console.log(artists);
    })
  } else {
    console.log("ADENTRO DEL ELSE DE NULL");
    artistsIds = null;
    artists = null;
  }
  return {
    type: FETCH_ARTISTS,
    payload: {ids: artistsIds, artistsResult: artists}
  }
}
/* const searchQuery = `search?q=${query}&type=artist&limit=4`;
const url = 'https://api.spotify.com/v1/' + searchQuery; */
export function makeApiFetch(url, callback) {
  return async dispatch => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer BQA8Qcru8BMrQVkLahzI--37hGJnDWPrHNOg4CuYaYtT4yDIG5q6SYzJzxVz9Z-wUM5fGQqYttrrgEmOFYM',
        }
      });
      const responseJson = await response.json();
      dispatch(callback({response:responseJson}));
    }
    catch (Error) {
      console.error(Error);
    }
  }

}

/* export function getArtists(query) {
  return async dispatch => {
    try {
      const searchQuery = `search?q=${query}&type=artist&limit=4`;
      const url = 'https://api.spotify.com/v1/' + searchQuery;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer BQCiOYqMwExtQPtsp-v0G4HDMt-ukKY03ehTzaxN_6YSqvsqjq_ZP0UWlXVgvgP50HLzZh0hgEv6Mnx2gOs',
        }
      });
      const responseJson = await response.json();
      dispatch(getArtistsAction({response:responseJson}));
    }
    catch (Error) {
      console.error(Error);
    }
  }
} */

export function selectArtist(artist) {
  return {
    type: SELECT_ARTIST,
    payload: artist
  }
}

export function getAlbumsAction(data) {
  let result = data.response.items.filter((item) => {
    return (item.available_markets.includes("AR"));
  }).map((item) => {
    return {
      name: item.name,
      id: item.id,
      img: item.images[0],
      release: item.release_date.split('-')[0]
    }
  });

  return {
    type: FETCH_ALBUMS,
    payload: {
      result: result,
    }
  }
}


export function getAlbums(id) {
  return async dispatch => {
    try {
      const url = `https://api.spotify.com/v1/artists/${id}/albums`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer BQA8Qcru8BMrQVkLahzI--37hGJnDWPrHNOg4CuYaYtT4yDIG5q6SYzJzxVz9Z-wUM5fGQqYttrrgEmOFYM',
        }
      });
      const responseJson = await response.json();
      dispatch(getAlbumsAction({response:responseJson}));
    }
    catch (ERROR) {
      console.error(ERROR);
    }
  }
}

export function selectAlbum(album) {
  return {
    type: SELECT_ALBUM,
    payload: album
  }
}

export function getTracksAction(data) {
  return {
    type: FETCH_TRACKS,
    payload: data.responseJson.items,
  }
}


export function getTracks(id) {
  return async dispatch => {
    try {
      const url = `https://api.spotify.com/v1/albums/${id}/tracks`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer BQA8Qcru8BMrQVkLahzI--37hGJnDWPrHNOg4CuYaYtT4yDIG5q6SYzJzxVz9Z-wUM5fGQqYttrrgEmOFYM',
        }
      });
      const responseJson = await response.json();
      dispatch(getTracksAction({responseJson}));
    }
    catch (ERROR) {
    }
  }
}

export function addFavorite(data) {
  return {
    type: ADD_FAVORITE,
    payload: {
      id: data.id,
      trackData: data.trackData
    }
  }
}

export function removeFavorite(id) {
  return {
    type: REMOVE_FAVORITE,
    payload: id
  }
}