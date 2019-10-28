import assocPath from 'ramda/es/assocPath';
import { accountSetCreate } from '~/redux/account/actions';
import { IAccountState } from '.';
import { ACCOUNT_ACTIONS } from './constants';

const setCreate = (state: IAccountState, { create }: ReturnType<typeof accountSetCreate>) =>
  assocPath(['create'], { ...state.create, ...create }, state);

export const ACCOUNT_HANDLERS = {
  [ACCOUNT_ACTIONS.SET_CREATE]: setCreate,
};
