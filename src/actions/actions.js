import { FETCH_ARTISTS, SELECT_ARTIST, FETCH_ALBUMS, SELECT_ALBUM, FETCH_TRACKS, ADD_FAVORITE, REMOVE_FAVORITE, GET_TOKEN } from "../constants/actionTypes";

/* function getTokenAction(response) {
  console.log(response);
  return {
    type: GET_TOKEN,
    payload: response.response
  }
} */
/* dispatch(getTokenAction({response:responseJson}));
var data = "grant_type=client_credentials&client_id=ff43d276be5d403f8211fe6322dff4f1&client_secret=bf7abbf4d3864923bb0be8383c8d8cbb";

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://accounts.spotify.com/api/token");
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.15.0");
xhr.setRequestHeader("Accept", "");


/* xhr.setRequestHeader("Cache-Control", "no-cache");
xhr.setRequestHeader("Postman-Token", "9dd7283e-2d59-4553-a97d-23ae429e65d4,87731ee6-e7d4-43e4-9507-d367e6df159d");
xhr.setRequestHeader("Host", "accounts.spotify.com");
xhr.setRequestHeader("accept-encoding", "gzip, deflate");
xhr.setRequestHeader("content-length", "119");
xhr.setRequestHeader("Connection", "keep-alive");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send(data);

export function getToken() {
  var data = "grant_type=client_credentials&client_id=ff43d276be5d403f8211fe6322dff4f1&client_secret=bf7abbf4d3864923bb0be8383c8d8cbb";

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open("POST", "https://accounts.spotify.com/api/token");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.15.0");
  xhr.setRequest
/*   xhr.setRequestHeader("Cache-Control", "no-cache");
  xhr.setRequestHeader("Postman-Token", "9dd7283e-2d59-4553-a97d-23ae429e65d4,87731ee6-e7d4-43e4-9507-d367e6df159d");
  xhr.setRequestHeader("Host", "accounts.spotify.com");
  xhr.setRequestHeader("accept-encoding", "gzip, deflate");
  xhr.setRequestHeader("content-length", "119");
  xhr.setRequestHeader("Connection", "keep-alive");
  xhr.setRequestHeader("cache-control", "no-cache");

  xhr.send(data);
} */
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
          'Authorization': 'Bearer BQBawFapLgy9ijF0VC54z4ZF6PW8gdJh1UEzPzNWXDfRfI00p4gZJ_YSRnSGFySeNR2irim4TZCAMSZ_ALU',
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