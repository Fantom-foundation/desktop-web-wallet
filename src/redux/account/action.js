import * as types from '../constants';
import { dispatch } from '../store';

export default function createAccount(data) {
  dispatch({
    type: types.CREATE_NEW_ACCOUNT,
    payload: data,
  });
}
