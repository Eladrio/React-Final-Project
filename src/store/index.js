import appReducer from "../reducers/appReducer";
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';



const store = createStore(appReducer, applyMiddleware(thunk));
export default store;
