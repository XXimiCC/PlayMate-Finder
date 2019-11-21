import {CREATE_GAME_ERROR, CREATE_GAME_START, CREATE_GAME_SUCCESS} from "../actions/actionTypes";

const initialState = {
    game: null,
    isLoading: false,
    error: null
};


export default function gameReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_GAME_START:
            return {...state, isLoading: true};
        case CREATE_GAME_SUCCESS:
            return {...state, isLoading: false};
        case CREATE_GAME_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        default:
            return state
    }
}