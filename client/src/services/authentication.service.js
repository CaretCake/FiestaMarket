import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../helpers/export';
import history from '../helpers/history';
import axios from 'axios';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
  login,
  logout,
  isSessionValid,
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
      return response.data;
    }).catch(err => {
      return err.response.data;
    });
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

function isSessionValid() {
  if (this.currentUserValue) { // If browser thinks user is logged in, verify session validity
    axios.get(process.env.REACT_APP_API_URL + `/users/${this.currentUserValue.userId}/sessions`, {
      userId: this.currentUserValue.userId
    })
      .then((res) => {
        // session is valid, do nothing
      }).catch(err => {
        // session is invalid, remove user from local storage
        localStorage.removeItem('currentUser');
        currentUserSubject.next(null);
      });
  }
}

function isLoggedIn() {
  if (!this.currentUserValue) {
    history.push('/login');
  }
}