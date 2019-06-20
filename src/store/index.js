import appReducer from "../reducers/appReducer";
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import {loadState, saveState} from '../localStorage/localStorage';
import { throttle } from 'lodash';

/* In case of existing a state in the LocalStorage this loads it. */
const persistedState = loadState();

/* This creates the store with the initial state or the persisted state
   if it exists */
const store = createStore(appReducer, persistedState, applyMiddleware(thunk));

/* Subscribe the saveState to the store, so every time the store's state
   gets changed saveState gets called. The throttle function is added so
   that saveState can only get called once per second due to perfomance
   reasons. */
store.subscribe(throttle(() => {
  saveState({
    searchText: store.getState().searchText,
    artistsSearchResult : store.getState().artistsSearchResult,
    artistsIds: store.getState().artistsIds,
    artistSelectedInfo: store.getState().artistSelectedInfo,
    artistSelectedId : store.getState().artistSelectedId,
    albumsSearchResult : store.getState().albumsSearchResult,
    albumSelectedId : store.getState().albumSelectedId,
    selectedAlbumTracks: store.getState().selectedAlbumTracks,
    favoriteTracksIds: store.getState().favoriteTracksIds,
    favoriteTracks: store.getState().favoriteTracks
  });
}, 1000));

export default store;