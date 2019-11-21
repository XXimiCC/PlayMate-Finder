import {
  FB_LOGIN_ERROR,
  FB_LOGIN_START,
  FB_LOGIN_SUCCESS,
  GOOGLE_LOGIN_ERROR,
  GOOGLE_LOGIN_START,
  LOADING_END,
  LOADING_START,
  LOGOUT, RESTORE_SESSION_ERROR,
  RESTORE_SESSION_START, RESTORE_SESSION_SUCCESS
} from "../actions/actionTypes";

function createInitialState() {
  return {
    user: null,
    isAuth: false,
    provider: null,
    isLoading: false
  }
}

const initialState = createInitialState();

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case FB_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        provider: 'facebook',
        isAuth: true,
        isLoading: false
      };
    case FB_LOGIN_ERROR:
    case GOOGLE_LOGIN_ERROR:
    case RESTORE_SESSION_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case RESTORE_SESSION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.user,
        provider: action.provider,
        isAuth: true,
      };
    case LOGOUT:
      return createInitialState();
    case LOADING_START:
    case FB_LOGIN_START:
    case GOOGLE_LOGIN_START:
    case RESTORE_SESSION_START:
      return {...state, isLoading: true};
    case LOADING_END:
      return {...state, isLoading: false};
    default:
      return state
  }
}