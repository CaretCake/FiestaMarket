import { authHeader, handleResponse } from '../helpers/export';
import axios from "axios";

export const itemService = {
  getAll,
  getByFilters
};

function getAll() {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`/users`, requestOptions).then(handleResponse);
}

function getByFilters(query) {
  return axios.get(`http://localhost:9000/items/search?&term=${query}`)
    .then(handleResponse)
    .then(data => {
      console.log('data:' + data);
      return data;
    })
    .catch(error => {
      console.log('error: ' + error);
    });
}