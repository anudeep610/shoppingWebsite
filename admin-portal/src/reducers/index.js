import authReducer from "./auth";
import userReducer from "./user";
import categoryReducer from "./category";

import { combineReducers } from "redux";

const rootReducer= combineReducers({
    auth: authReducer,
    user: userReducer,
    category:categoryReducer
});

export default rootReducer;