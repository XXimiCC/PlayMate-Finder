import {Auth} from 'aws-amplify';
import {
  FB_LOGIN_ERROR,
  FB_LOGIN_START, FB_LOGIN_SUCCESS,
  GOOGLE_LOGIN_ERROR, GOOGLE_LOGIN_START, GOOGLE_LOGIN_SUCCESS,
  LOGOUT,
  RESTORE_SESSION_ERROR, RESTORE_SESSION_START, RESTORE_SESSION_SUCCESS
} from "./actionTypes";
import _ from 'lodash';

export function restoreSession() {
  return async (dispatch, getState) => {
    dispatch({type: RESTORE_SESSION_START});

    try{
      const user = await Auth.currentAuthenticatedUser({
        bypassCache: false
      });

      const provider = user.username.split('_')[0];
      let userData = user.attributes;

      if (provider === 'Facebook') {
        try {
          userData.picture = _.get(JSON.parse(userData.picture), 'data.url', '');
        } catch (e) {
          console.log('Parse FB Picture Error');
        }
      }

      dispatch({
        type: RESTORE_SESSION_SUCCESS,
        user: userData,
        provider: provider
      });
    } catch (e) {
      dispatch({type: RESTORE_SESSION_ERROR});
      console.log('restoreSession error:', e);
    }
  }
}

export function fbLogin() {
  return async (dispatch, getState) => {
    try{
      dispatch({type: FB_LOGIN_START});

      const user = await Auth.federatedSignIn({provider: 'Facebook'});

      dispatch({type: FB_LOGIN_SUCCESS, user});
    } catch (error) {
      dispatch({type: FB_LOGIN_ERROR, error});
      console.log('FB Login Failure', error);
    }
  }
}

export function googleLogin() {
  return async (dispatch, getState) => {
    try{
      dispatch({type: GOOGLE_LOGIN_START});

      const user = await Auth.federatedSignIn({provider: 'Google'});

      dispatch({type: GOOGLE_LOGIN_SUCCESS, user});
    } catch (error) {
      dispatch({type: GOOGLE_LOGIN_ERROR, error});
      console.log('FB Login Failure', error);
    }
  }
}

export function logout() {
  return async (dispatch, getState) => {
    try{
      await Auth.signOut();

      dispatch({
        type: LOGOUT
      })
    } catch (e) {
      console.log('Logout Failure', e);
    }
  }
}