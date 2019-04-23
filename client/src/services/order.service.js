import { handleResponse } from '../helpers/export';
import axios from "axios";

export const orderService = {
  postSellOrder,
  postBuyOrder
};

// noinspection SpellCheckingInspection
// noinspection SpellCheckingInspection
function postSellOrder(price, openToOffers, server, enhancement, end, dex, int, str, spr, hp, sp, dmg, mdmg, def, mdef, aim, eva, itemId, userId) {
  // noinspection SpellCheckingInspection
  // noinspection SpellCheckingInspection
  // noinspection SpellCheckingInspection
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

// noinspection SpellCheckingInspection
// noinspection SpellCheckingInspection
function postBuyOrder(priceMin, priceMax, server, enhancement, end, dex, int, str, spr, hp, sp, dmg, mdmg, def, mdef, aim, eva, itemId, userId) {
  // noinspection SpellCheckingInspection
  // noinspection SpellCheckingInspection
  // noinspection SpellCheckingInspection
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