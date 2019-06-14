import { FETCH_ARTISTS, SELECT_ARTIST, FETCH_ALBUMS, SELECT_ALBUM } from "../constants/actionTypes";

const initialState = {
  searchText : '',
  artistsSearchResult : {},
  artistSelectedId : null,
  albumsSearchResult : [],
  albumSelectedId : null,
  artistSearchResult: {},
  artistSelectedId : null
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
    return {
      ...state,
      albumSelectedId: action.payload
    }
  }
    return state;
  }

export default appReducer;