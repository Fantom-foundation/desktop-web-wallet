import * as types from '../constants';
import { dispatch } from '../store';

export default function createAccount(data) {
  console.log(data, 'datadata');
  dispatch({
    type: types.CREATE_NEW_ACCOUNT,
    payload: data,
  });
}
