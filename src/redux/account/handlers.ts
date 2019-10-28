import assocPath from 'ramda/es/assocPath';
import { accountSetCreate, accountSetCreateStage } from '~/redux/account/actions';
import { IAccountState } from '.';
import { ACCOUNT_ACTIONS } from './constants';

const setCreate = (state: IAccountState, { create }: ReturnType<typeof accountSetCreate>) =>
  assocPath(['create'], { ...state.create, ...create }, state);

const setCreateStage = (state: IAccountState, { stage }: ReturnType<typeof accountSetCreateStage>) =>
  assocPath(['create', 'stage'], stage, state);

export const ACCOUNT_HANDLERS = {
  [ACCOUNT_ACTIONS.SET_CREATE]: setCreate,
  [ACCOUNT_ACTIONS.SET_CREATE_STAGE]: setCreateStage,
};
