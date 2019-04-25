import { BehaviorSubject } from 'rxjs';

import { handleResponse } from '../helpers/export';
import axios from 'axios';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue () { return currentUserSubject.value; }
};

function login(username, password) {
  return axios.post(process.env.REACT_APP_API_URL + '/users/login', {
    username: username,
    password: password
  })
    .then(handleResponse)
    .then(response => {
      // store user details and token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
      currentUserSubject.next(response.data.user);
      return response;
    }).catch(err => {});
}

function logout() {
  // remove user from local storage to log user out
  axios.post(process.env.REACT_APP_API_URL + '/users/logout', {
    userId: this.currentUserValue.userId
  })
    .then(handleResponse)
    .then(user => {
    })
    .catch(err => {}/*console.log(err)*/);
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);

}