import authReducer from "./auth";
import userReducer from "./user";

import { combineReducers } from "redux";

const rootReducer= combineReducers({
    auth: authReducer,
    user: userReducer
});

export default rootReducer;