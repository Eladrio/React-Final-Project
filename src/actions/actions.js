import { FETCH_ARTISTS, SELECT_ARTIST, FETCH_ALBUMS, SELECT_ALBUM } from "../constants/actionTypes";

export function getArtistsAction(data) {
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
          'Authorization': 'Bearer BQA68ZVTUwkEnaZUVcmMTOQ4oGXOhXn8y4SSAKUg8PdkgBWfR7kdkswM-5fcwavnhezah-6EPsfb7AKBM08',
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
  })
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
          'Authorization': 'Bearer BQAv_tlwLZiXidAap75KtqHvFQ-tEjpkpk5Vx2PLmf3fWXm5MtPu3MVCIyf1biMXUgGf5-H3fsELBV7pD5U',
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

export function getTracks(id) {
  return async dispatch => {
    try {
      const url = `https://api.spotify.com/v1/artists/${id}/albums`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer BQAv_tlwLZiXidAap75KtqHvFQ-tEjpkpk5Vx2PLmf3fWXm5MtPu3MVCIyf1biMXUgGf5-H3fsELBV7pD5U',
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


export function selectTrack(track) {
  return {
    type: SELECT_TRACK,
    payload: track
  }
}

