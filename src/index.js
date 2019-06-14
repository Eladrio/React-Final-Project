import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import getRoutes from './routes/';
import { Provider } from "react-redux";
import store from "./store/index";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {getRoutes()}
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

