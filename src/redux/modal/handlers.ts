import { MODAL_ACTIONS } from './constants';
import { modalShow } from './actions';
import { IModalState } from '.';
import { assocPath } from 'ramda';

const showModal = (state: IModalState, { current }: ReturnType<typeof modalShow>): IModalState => ({
  ...state,
  isOpened: true,
  current,
});

const hideModal = (state: IModalState): IModalState =>
  assocPath(['isOpened'], false, state); 

export const MODAL_HANDLERS = {
  [MODAL_ACTIONS.SHOW_MODAL]: showModal,
  [MODAL_ACTIONS.HIDE_MODAL]: hideModal,
};
