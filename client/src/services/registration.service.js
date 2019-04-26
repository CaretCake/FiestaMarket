import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../helpers/export';
import axios from 'axios';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const registrationService = {
  register
};

function register(username, email, password) {

  //console.log('submitting: ' + username + ', ' + email + ', ' + password);
  return axios.post(process.env.REACT_APP_API_URL + '/users', {
    username: username,
    email: email,
    pass: password
  })
    .then(user => {
      return 'Registered';
    }).catch(error => handleResponse(error.response));
}