import { FETCH_ARTISTS, SELECT_ARTIST, FETCH_ALBUMS, SELECT_ALBUM, FETCH_TRACKS, ADD_FAVORITE, REMOVE_FAVORITE, SUBMIT_INPUT, GET_TOKEN, SORT_TABLE } from "../constants/actionTypes";

const initialState = {
  token: "",
  searchText : '',
  artistsSearchResult : null,
  artistsIds: [],
  artistSelectedInfo: null,
  artistSelectedId : null,
  albumsSearchResult : [],
  albumSelectedId : null,
  selectedAlbumTracks: null,
  favoriteTracksIds: [],
  favoriteTracks: null,
  sortTable: false
};

function appReducer(state = initialState, action) {
  if (action.type === GET_TOKEN) {
    return {
      ...state,
      token: action.payload.access_token
    }
  }

  if (action.type === SUBMIT_INPUT) {
    return {
      ...state,
      searchText: action.payload
    }
  }
  if (action.type === FETCH_ARTISTS) {
    return{
      ...state,
      artistsIds: action.payload.ids,
      artistsSearchResult: action.payload.artistsResult
    };
  }
  if (action.type === SELECT_ARTIST) {
    return {
      ...state,
      artistSelectedId: action.payload,
      artistSelectedInfo: state.artistsSearchResult[action.payload]
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
  if (action.type === FETCH_TRACKS) {
    return {
      ...state,
      selectedAlbumTracks: action.payload
    }
  }
  if (action.type === ADD_FAVORITE) {
    let favorites = {...state.favoriteTracks};
    favorites[action.payload.id] = action.payload.trackData;
    return {
      ...state,
      favoriteTracksIds: [...state.favoriteTracksIds, action.payload.id],
      favoriteTracks: favorites
    }
  }
  if (action.type === REMOVE_FAVORITE) {
    let newFavoritesId = state.favoriteTracksIds.filter((item) => {
      return item !== action.payload;
    });
    let newFavorites = {...state.favoriteTracks};
    delete newFavorites[action.payload];
    return {
      ...state,
      favoriteTracks: newFavorites,
      favoriteTracksIds: newFavoritesId
    }
  }
  if (action.type === SORT_TABLE) {
    return {
      ...state,
      sortTable: !state.sortTable
    }
  }
    return state;
  }

export default appReducer;