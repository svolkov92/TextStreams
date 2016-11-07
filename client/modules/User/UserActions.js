/**
 * Created by Volkov on 26.10.2016.
 */
import callApi from '../../util/apiCaller';
import { browserHistory } from 'react-router';

export const ADD_USERS = 'ADD_USERS';
export const UPDATE_USER = 'UPDATE_USER';

export function addUsers(users) {
  return {
    type: ADD_USERS,
    users,
  };
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    user,
  };
}

export function updateUserRequest(user) {
  return (dispatch) => {
    return callApi('users/update', 'post', { user }).then(res => {
      dispatch(updateUser(res.user))
    });
  };
}

export function addUserRequest(user) {
  return (dispatch) => {
    return callApi('users/registration', 'post', { user }).then(res => {
      localStorage.setItem('authenticationToken', res.token);
      localStorage.setItem('accessLevel', res.accessLevel);
      localStorage.setItem('userName', user.email);
      browserHistory.push('/');
    });
  };
}

export function signInRequest(creds) {
  return (dispatch) => {
    return callApi('auth', 'post', creds).then(res => {
      localStorage.setItem('authenticationToken', res.token);
      localStorage.setItem('accessLevel', res.accessLevel);
      localStorage.setItem('userName', creds.email);
      browserHistory.push('/');
    });
  };
}

export function fetchUsers() {
   return (dispatch) => {
       return callApi('users').then(res => {
           dispatch(addUsers(res.users));
       });
   };
}
