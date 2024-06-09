import {legacy_createStore as createStore} from "redux";
import { allReducers } from "./reducers/allReducers";

export default createStore(allReducers);