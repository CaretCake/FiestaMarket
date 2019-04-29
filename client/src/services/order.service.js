import { handleResponse } from '../helpers/export';
import axios from "axios";

export const orderService = {
  getAll,
  postSellOrder,
  postBuyOrder,
  deleteBuyOrderById,
  deleteSellOrderById,
  updateBuyOrderById,
  updateSellOrderById
};

// Get all orders
function getAll() {
  return Promise.all([
    axios.get(process.env.REACT_APP_API_URL + '/sell-orders'),
    axios.get(process.env.REACT_APP_API_URL + '/buy-orders')
  ])
    .then(values => {
      //console.log('data: ' + JSON.stringify(values[0]));
      return values;
    })
    .catch(error => handleResponse(error.response));
}

function postSellOrder(price, openToOffers, server, enhancement, end, dex, int, str, spr, hp, sp, dmg, mdmg, def, mdef, aim, eva, itemId, userId) {
  return axios.post(process.env.REACT_APP_API_URL + `/items/${itemId}/sell-orders`, {
    price: price,
    openToOffers: openToOffers,
    server: server,
    enhancement: enhancement,
    end: end,
    dex: dex,
    int: int,
    str: str,
    spr: spr,
    hp: hp,
    sp: sp,
    dmg: dmg,
    mdmg: mdmg,
    def: def,
    mdef: mdef,
    aim: aim,
    eva: eva,
    itemId: itemId,
    userId: userId
  })
    .then(order => {
      return 'Order posted';
    }).catch(error => handleResponse(error.response));
}

function postBuyOrder(priceMin, priceMax, server, enhancement, end, dex, int, str, spr, hp, sp, dmg, mdmg, def, mdef, aim, eva, itemId, userId) {
  return axios.post(process.env.REACT_APP_API_URL + `/items/${itemId}/buy-orders`, {
    priceMin: priceMin,
    priceMax: priceMax,
    server: server,
    enhancement: enhancement,
    end: end,
    dex: dex,
    int: int,
    str: str,
    spr: spr,
    hp: hp,
    sp: sp,
    dmg: dmg,
    mdmg: mdmg,
    def: def,
    mdef: mdef,
    aim: aim,
    eva: eva,
    itemId: itemId,
    userId: userId
  })
    .then(order => {
      return 'Order posted';
    }).catch(error => handleResponse(error.response));
}

// Delete buy order by id
function deleteBuyOrderById(buyOrderId, userId) {
  return axios.delete(process.env.REACT_APP_API_URL + `/users/${userId}/buy-orders/${buyOrderId}`)
    .then(res => {
      if (res.status === 404) {
        return null;
      }
      //console.log('info: ' + JSON.stringify(users.data));
      return res.data;
    })
    .catch(error => handleResponse(error.response));
}

// Delete sell order by id
function deleteSellOrderById(sellOrderId, userId) {
  return axios.delete(process.env.REACT_APP_API_URL + `/users/${userId}/sell-orders/${sellOrderId}`)
    .then(res => {
      if (res.status === 404) {
        return null;
      }
      //console.log('info: ' + JSON.stringify(users.data));
      return res.data;
    })
    .catch(error => handleResponse(error.response));
}

// Update buy order by id
function updateBuyOrderById(buyOrderId, priceMin, priceMax, status, server, enhancement, end, dex, int, str, spr, hp, sp, dmg, mdmg, def, mdef, aim, eva, userId) {
  return axios.put(process.env.REACT_APP_API_URL + `/users/${userId}/buy-orders/${buyOrderId}`, {
    priceMin,
    priceMax,
    status,
    server,
    enhancement,
    end,
    dex,
    int,
    str,
    spr,
    hp,
    sp,
    dmg,
    mdmg,
    def,
    mdef,
    aim,
    eva
  })
    .then(res => {
      console.log('info: ' + JSON.stringify(res));
    })
    .catch(error => handleResponse(error.response));
}

// Update sell order by id
function updateSellOrderById(sellOrderId, price, status, server, enhancement, end, dex, int, str, spr, hp, sp, dmg, mdmg, def, mdef, aim, eva, userId) {
  return axios.put(process.env.REACT_APP_API_URL + `/users/${userId}/sell-orders/${sellOrderId}`, {
    price,
    status,
    server,
    enhancement,
    end,
    dex,
    int,
    str,
    spr,
    hp,
    sp,
    dmg,
    mdmg,
    def,
    mdef,
    aim,
    eva
  })
    .then(res => {
      console.log('info: ' + JSON.stringify(res));
    })
    .catch(error => handleResponse(error.response));
}