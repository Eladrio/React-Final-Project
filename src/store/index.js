import appReducer from "../reducers/appReducer";
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import {loadState, saveState} from '../localStorage/localStorage';
import { throttle } from 'lodash';

const persistedState = loadState();

const store = createStore(appReducer, persistedState, applyMiddleware(thunk));

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