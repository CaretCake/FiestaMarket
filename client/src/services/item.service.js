import { handleResponse } from '../helpers/export';
import axios from "axios";

export const itemService = {
  getByFilters,
  getSellOrders,
  getById,
  getBuyOrders
};

function getByFilters(id) {
  return axios.get(process.env.REACT_APP_API_URL + `/items/search?&term=${id}`)
    .then(handleResponse)
    .then(data => {
      //console.log('data:' + data);
      return data;
    })
    .catch(error => {
      //console.log('error: ' + error);
    });
}

function getById(id) {
  return Promise.all([
    axios.get(process.env.REACT_APP_API_URL + `/items/${id}`),
    axios.get(process.env.REACT_APP_API_URL + `/items/${id}/sell-orders/average`),
    axios.get(process.env.REACT_APP_API_URL + `/items/${id}/buy-orders/average`),
  ])
    .then(values => {
      return values;
    })
    .catch(error => handleResponse(error.response));
}

function getSellOrders(id) {
  return axios.get(process.env.REACT_APP_API_URL + `/items/${id}/sell-orders`)
    .then(handleResponse)
    .then(data => {
      return data;
    })
    .catch(error => {
      //console.log('error: ' + error);
    });
}

function getBuyOrders(id) {
  return axios.get(process.env.REACT_APP_API_URL + `/items/${id}/buy-orders`)
    .then(handleResponse)
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log('error: ' + error);
    });
}