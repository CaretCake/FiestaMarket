import { handleResponse } from '../helpers/export';
import axios from "axios";

export const userService = {
  getAll,
  getById,
  updateById: updateStatusById
};

// Get all users (role required)
function getAll() {
  return axios.get(process.env.REACT_APP_API_URL + '/users')
    .then(users => {
      if (users.status === 404) {
        return null;
      }
      //console.log('info: ' + JSON.stringify(users.data));
      return users.data;
    })
    .catch(error => handleResponse(error.response));
}

// Get user by id
function getById(id) {
  return axios.get(process.env.REACT_APP_API_URL + `/users/${id}`)
    .then(userInfo => {
      if (userInfo.status === 404) {
        return null;
      }
      //console.log('info: ' + JSON.stringify(userInfo.data));
      return userInfo.data;
    })
    .catch(error => handleResponse(error.response));
}

// Update user status by id
function updateStatusById(id, status) {
  return axios.put(process.env.REACT_APP_API_URL + `/users/${id}`, {
    status: status
  })
    .then(res => {
      console.log('info: ' + JSON.stringify(res));
    })
    .catch(error => handleResponse(error.response));
}