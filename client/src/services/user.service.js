import { handleResponse } from '../helpers/export';
import axios from "axios";

export const userService = {
  getAll,
  getById,
  updateById,
  deleteUserById,
  deleteUserAliasById,
  updateUserAliasById,
  createUserAliasById
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
function updateById(id, status) {
  return axios.put(process.env.REACT_APP_API_URL + `/users/${id}`, {
    status: status
  })
    .then(res => {
      console.log('info: ' + JSON.stringify(res));
    })
    .catch(error => handleResponse(error.response));
}

// Delete user by id (role required)
function deleteUserById(id) {
  return axios.delete(process.env.REACT_APP_API_URL + `/users/${id}`)
    .then(res => {
      if (res.status === 404) {
        return null;
      }
      //console.log('info: ' + JSON.stringify(users.data));
      return res.data;
    })
    .catch(error => handleResponse(error.response));
}

// Delete user alias by id
function deleteUserAliasById(aliasId, userId) {
  return axios.delete(process.env.REACT_APP_API_URL + `/users/${userId}/aliases/${aliasId}`)
    .then(res => {
      if (res.status === 404) {
        return null;
      }
      //console.log('info: ' + JSON.stringify(users.data));
      return res.data;
    })
    .catch(error => handleResponse(error.response));
}

// Update user alias by id
function updateUserAliasById(aliasId, userId, aliasName, preferred) {
  console.log(preferred);
  return axios.put(process.env.REACT_APP_API_URL + `/users/${userId}/aliases/${aliasId}`, {
      aliasName,
      preferred
    })
    .then(res => {
      console.log('info: ' + JSON.stringify(res));
    })
    .catch(error => handleResponse(error.response));
}

// Create user alias by id
function createUserAliasById(aliasName, type, server, preferred, userId) {
  return axios.post(process.env.REACT_APP_API_URL + `/users/${userId}/aliases`, {
    aliasName,
    type,
    server,
    preferred
  })
    .then(alias => {
      return alias.data;
    }).catch(error => handleResponse(error.response));
}