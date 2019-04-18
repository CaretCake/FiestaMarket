import { BehaviorSubject } from 'rxjs';

import { handleResponse } from '../helpers/export';
import axios from 'axios';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const registrationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
  return axios.post('http://localhost:9000/users/login', {
    username: username,
    password: password
  })
    .then(user => {
      // store user details and token in local storage to keep user logged in between page refreshes
      console.log(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      currentUserSubject.next(user);
      return user;
    }).catch(error => handleResponse(error.response));
}

function logout() {
  // remove user from local storage to log user out
  axios.get('http://localhost:9000/users/logout')
    .then(user => {
    })
    .catch(err => console.log(err));
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);

}