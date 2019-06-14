import { FETCH_ARTISTS, SELECT_ARTIST, FETCH_ALBUMS, SELECT_ALBUM, FETCH_TRACKS } from "../constants/actionTypes";

export function getArtistsAction(data) {
  console.log("GET ARTISTS ACTION");
  let result = {};
  data.response.artists.items ? result = data.response.artists.items.map((item) => {
    return {
      id: item.id,
      img: item.images[0],
      name: item.name
    }
  })
  : null
  return {
    type: FETCH_ARTISTS,
    payload: {
      result: result,
      searchText: data.search
    }
  }
}

export function getArtists(query) {
  return async dispatch => {
    try {
      const searchQuery = `search?q=${query}&type=artist&limit=4`;
      const url = 'https://api.spotify.com/v1/' + searchQuery;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer BQCDxS-SWPwaRfRgsf5sAdLprk48OgxMVIgwe0XhY1hs4jav1x0gKhk-n4WV_lC7B9IVVi-DhTUffbqwNWI',
        }
      });
      const responseJson = await response.json();
      dispatch(getArtistsAction({response:responseJson,search:query}));
    }
    catch (Error) {
      console.error(Error);
    }
  }
}

export function selectArtist(artist) {
  console.log("SELECT ARTIST");
  console.log(artist);
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
      release: item.release_date.split('-')
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
          'Authorization': 'Bearer BQCDxS-SWPwaRfRgsf5sAdLprk48OgxMVIgwe0XhY1hs4jav1x0gKhk-n4WV_lC7B9IVVi-DhTUffbqwNWI',
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
  console.log(data);
  return {
    type: FETCH_TRACKS,
    payload: {
      result: data,
    }
  }
}


export function getTracks(id) {
  console.log(id);
  return async dispatch => {
    try {
      const url = `https://api.spotify.com/v1/albums/${id}/tracks`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer BQCDxS-SWPwaRfRgsf5sAdLprk48OgxMVIgwe0XhY1hs4jav1x0gKhk-n4WV_lC7B9IVVi-DhTUffbqwNWI',
        }
      });
      const responseJson = await response.json();
      dispatch(getTracksAction({response:responseJson}));
    }
    catch (ERROR) {
      console.error(ERROR);
    }
  }
}

