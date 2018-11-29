import * as types from '../constants';
import { dispatch } from '../store';

export default function createPublicPrivateKeys(data) {
  console.log(data, 'createPublicPrivateKeyscreatePublicPrivateKeys');
  dispatch({
    type: types.MASTER_PUBLIC_PRIVATE_KEY,
    payload: data,
  });
}
