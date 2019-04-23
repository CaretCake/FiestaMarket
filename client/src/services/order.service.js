import { handleResponse } from '../helpers/export';
import axios from "axios";

export const orderService = {
  postSellOrder,
  postBuyOrder
};

function postSellOrder(price, openToOffers, server, enhancement, end, dex, int, str, spr, hp, sp, dmg, mdmg, def, mdef, aim, eva, itemId, userId) {
  return axios.post(process.env.REACT_APP_API_URL + '/sellorders/add', {
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
  return axios.post(process.env.REACT_APP_API_URL + '/buyorders/add', {
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