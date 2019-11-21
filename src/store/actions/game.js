import axios from "../../config/firebaseAxios";
import {CREATE_GAME_ERROR, CREATE_GAME_START, CREATE_GAME_SUCCESS} from "./actionTypes";

export function createGameStart() {
  return {
    type: CREATE_GAME_START,
  }
}

export function createGameSuccess(game) {
  return {type: CREATE_GAME_SUCCESS, game}
}

export function createGameError(error) {
  return {type: CREATE_GAME_ERROR, error}
}

export function createGame(game) {
  return async (dispatch, getState) => {
    try{
      dispatch(createGameStart());
      const resp = await axios.post('games.json', game);

      dispatch(createGameSuccess(resp.data));
    } catch (e) {
      dispatch(createGameError());
      console.log(e);
    }
  }
}