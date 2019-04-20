import { authHeader, handleResponse } from '../helpers/export';
import axios from "axios";

export const userService = {
  getAll,
  getById
};

function getAll() {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`/users`, requestOptions).then(handleResponse);
}

function getById(id) {
  return axios.get(`http://localhost:9000/users?userId=${id}`)
    .then(handleResponse)
    .then(userInfo => {
      if (userInfo.status === 404) {
        return null;
      }
      console.log('info: ' + JSON.stringify(userInfo.data));
      return userInfo.data;
    })
    .catch(error => {
      console.log('error: ' + error);
    });
}