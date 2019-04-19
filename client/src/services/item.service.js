import { authHeader, handleResponse } from '../helpers/export';
import axios from "axios";

export const itemService = {
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
      //this.setState({ user: userInfo.data });
      console.log('info: ' + JSON.stringify(userInfo.data));
      return userInfo.data;
    })
    .catch(error => {
      console.log('error: ' + error);
      /*if (error.response.status === 401) {
        this.props.history.push('/');
      }*/
    });



  //fetch(`/users/${id}`, requestOptions).then(handleResponse);
}