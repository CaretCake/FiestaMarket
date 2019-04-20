import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../helpers/export';
import axios from 'axios';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const registrationService = {
  register
};

function register(username, email, password) {

  console.log('submitting: ' + username + ', ' + email + ', ' + password);
  return axios.post('http://localhost:9000/users/add', {
    username: username,
    email: email,
    pass: password
  })
    .then(user => {
      return 'Registered';
    }).catch(error => handleResponse(error.response));
}