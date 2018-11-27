import * as types from '../constants';
import { dispatch } from '../store';

// export function createPublicPrivateKeys(data) {
//   console.log(data, 'createPublicPrivateKeyscreatePublicPrivateKeys');
//   dispatch({
//     type: types.MASTER_PUBLIC_PRIVATE_KEY,
//     payload: data,
//   });
// }

export default function createMnemonic(data) {
  dispatch({
    type: types.MNEMONIC_CODE,
    payload: data,
  });
}
