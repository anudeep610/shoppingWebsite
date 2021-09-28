import {createStore,applyMiddleware} from "redux";
import rootreducer from "./reducers";
import thunk from "redux-thunk";

const store = createStore(rootreducer,applyMiddleware(thunk));

export default store;