import { handleResponse } from '../helpers/export';
import axios from "axios";

export const itemService = {
  getByFilters,
  getSellOrders,
  getById,
  getBuyOrders
};

function getByFilters(query) {
  return axios.get(process.env.REACT_APP_API_URL + `/items/search?&term=${query}`)
    .then(handleResponse)
    .then(data => {
      //console.log('data:' + data);
      return data;
    })
    .catch(error => {
      //console.log('error: ' + error);
    });
}

function getById(query) {
  return axios.get(process.env.REACT_APP_API_URL + `/items/${query}`)
    .then(handleResponse)
    .then(data => {
      return data;
    })
    .catch(error => {
      //console.log('error: ' + error);
    });
}

function getSellOrders(query) {
  return axios.get(process.env.REACT_APP_API_URL + `/items/${query}/sellOrders`)
    .then(handleResponse)
    .then(data => {
      return data;
    })
    .catch(error => {
      //console.log('error: ' + error);
    });
}

function getBuyOrders(query) {
  return axios.get(process.env.REACT_APP_API_URL + `/items/${query}/buyOrders`)
    .then(handleResponse)
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log('error: ' + error);
    });
}