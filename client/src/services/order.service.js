import { authHeader, handleResponse } from '../helpers/export';
import axios from "axios";

export const orderService = {
  postSellOrder
};

function postSellOrder(price, openToOffers, server, enhancement, end, dex, int, str, spr, hp, sp, dmg, mdmg, def, mdef, aim, eva, itemId, userId) {
  return axios.post('http://localhost:9000/sellorders/add', {
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