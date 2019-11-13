import {combineReducers} from "redux";
import createGameReducer from "./createGame";

export default combineReducers({
    createGame: createGameReducer
});