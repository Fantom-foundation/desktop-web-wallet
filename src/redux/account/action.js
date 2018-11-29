import * as types from '../constants';
import { dispatch } from '../store';

export default function createWallet(data) {
  dispatch({
    type: types.CREATE_WALLET,
    payload: data,
  });
}
