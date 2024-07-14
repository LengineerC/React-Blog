import {legacy_createStore as createStore, applyMiddleware, compose} from "redux";
import { allReducers } from "./reducers/allReducers";
import createSagaMiddleware from 'redux-saga';
import watchRoot from "./sagas/watchRoot";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware=createSagaMiddleware();
export default createStore(
    allReducers,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(watchRoot);
