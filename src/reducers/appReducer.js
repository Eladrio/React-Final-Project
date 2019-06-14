import { FETCH_ARTISTS, SELECT_ARTIST, FETCH_ALBUMS, SELECT_ALBUM, FETCH_TRACKS } from "../constants/actionTypes";

const initialState = {
  searchText : '',
  artistsSearchResult : {},
  artistSelectedId : null,
  albumsSearchResult : [],
  albumSelectedId : null,
  selectedAlbumTracks: {},

};

function appReducer(state = initialState, action) {
  if (action.type === FETCH_ARTISTS) {
    return{
      ...state,
      artistsSearchResult: action.payload.result,
      searchText: action.payload.searchText
    };
  }
  if (action.type === SELECT_ARTIST) {
    console.log("SELECT ARTIST REDUCER");
    console.log(action.payload);
    return {
      ...state,
      artistSelectedId: action.payload
    }
  }
  if (action.type === FETCH_ALBUMS) {
    return {
      ...state,
      albumsSearchResult: action.payload.result
    }
  }
  if (action.type === SELECT_ALBUM) {
    console.log("EN SELECT ALBUM");
    console.log(action.payload);
    return {
      ...state,
      albumSelectedId: action.payload
    }
  }
  if (action.type === FETCH_TRACKS) {
    console.log("FETCH TRACKS REDUCER");
    console.log(action.payload);
    return {
      ...state,
      selectedAlbumTracks: action.payload
    }
  }
    return state;
  }

export default appReducer;