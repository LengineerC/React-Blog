import {legacy_createStore as createStore, applyMiddleware, compose} from "redux";
import { allReducers } from "./reducers/allReducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(allReducers,composeEnhancers(applyMiddleware()));