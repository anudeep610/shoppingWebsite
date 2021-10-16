import authReducer from "./auth";
import userReducer from "./user";
import categoryReducer from "./category";
import productReducer from "./product";

import { combineReducers } from "redux";

const rootReducer= combineReducers({
    auth: authReducer,
    user: userReducer,
    category:categoryReducer,
    product:productReducer
});

export default rootReducer;