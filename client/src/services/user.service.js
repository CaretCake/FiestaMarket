import { handleResponse } from '../helpers/export';
import axios from "axios";

export const userService = {
  getAll,
  getById
};

function getAll() {
  return axios.get(`http://localhost:9000/users`)
    .then(users => {
      if (users.status === 404) {
        return null;
      }
      console.log('info: ' + JSON.stringify(users.data));
      return users.data;
    })
    .catch(error => handleResponse(error.response));
}

function getById(id) {
  return axios.get(`http://localhost:9000/users/${id}`)
    .then(userInfo => {
      if (userInfo.status === 404) {
        return null;
      }
      console.log('info: ' + JSON.stringify(userInfo.data));
      return userInfo.data;
    })
    .catch(error => handleResponse(error.response));
}