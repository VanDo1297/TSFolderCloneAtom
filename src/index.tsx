import * as React from "react";
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from "./pages/App";
import { createStore, compose } from "redux";
import { rootReducer } from "./store";
import { Provider } from "react-redux";
import { updateToken } from "./store/system/actions";
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
    }
}
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const token = localStorage.getItem('token');
if (token) {
    store.dispatch(updateToken(token));
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
