import {combineReducers} from "redux";
import gameReducer from "./game";
import authReducer from "./auth";

export default combineReducers({
    game: gameReducer,
    auth: authReducer
});