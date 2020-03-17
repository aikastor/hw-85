import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {createBrowserHistory} from "history";
import {connectRouter, routerMiddleware, ConnectedRouter} from "connected-react-router";
import thunkMiddleware from 'redux-thunk';
import {Provider} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-modal-video/scss/modal-video.scss';
import './index.css';
import App from './App';
import artistReducer from "./store/reducers/artistReducer";
import albumsReducer from "./store/reducers/albumsReducer";
import tracksReducer from "./store/reducers/tracksReducer";
import usersReducer from "./store/reducers/usersReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  artists: artistReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  users: usersReducer,
});

const middleware = [
  thunkMiddleware,
  routerMiddleware(history)
];
const enhancers = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer, enhancers);

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById('root'));


