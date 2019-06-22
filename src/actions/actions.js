import { FETCH_ARTISTS, SELECT_ARTIST, FETCH_ALBUMS, SELECT_ALBUM, FETCH_TRACKS, ADD_FAVORITE, REMOVE_FAVORITE, GET_TOKEN } from "../constants/actionTypes";

function getTokenAction(response) {
  console.log(response);
  return {
    type: GET_TOKEN,
    payload: response.response
  }
}
axios({
  url: 'https://accounts.spotify.com/api/token',
  method: 'post',
  params: {
    grant_type: 'client_credentials'
  },
  headers: {
    'Accept':'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  auth: {
    username: 'YOUR-CLIENT-ID',
    password: 'YOUR-CLIENT-SECRET'
  }
}).then(function(response) {
    console.log(response);
}).catch(function(error) {
});
export function getToken() {
  let data = {
    "grant_type": "client_credentials",
    "client_id": "ff43d276be5d403f8211fe6322dff4f1",
    "client_secret": "bf7abbf4d3864923bb0be8383c8d8cbb"
  };
  let encodedData = btoa(data);
  console.log(encodedData);
  return async dispatch => {
    try{
     let r = await fetch('https://accounts.spotify.com/api/token',
       {
         "method": "POST",
         "headers": {
           "Content-Type": "application/x-www-form-urlencoded",
           "Authorization": "Basic "+ encodedData
          }
       });
     console.log(r);
     dispatch(getTokenAction({response:r}));
    }
    catch(e){
      console.log(e);
    }

  }

}

export function getArtistsAction(data) {
  let artistsIds = [];
  let artists = {};
  if(data.response.artists.items) {
    data.response.artists.items.forEach(item => {
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
    })
  } else {
    artistsIds = null;
    artists = null;
  }
  return {
    type: FETCH_ARTISTS,
    payload: {ids: artistsIds, artistsResult: artists}
  }
}

export function makeApiFetch(url, callback) {
  return async dispatch => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer BQDvkIIBdfqoASDHQrhP6hWSvt-rcxUSxKyZbR4pUTnlWvjFS32WV8QliMFZ0IS2xaKnmZBACKq2F-uAzC0',
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

export function selectAlbum(album) {
  return {
    type: SELECT_ALBUM,
    payload: album
  }
}

export function getTracksAction(data) {
  return {
    type: FETCH_TRACKS,
    payload: data.response.items,
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