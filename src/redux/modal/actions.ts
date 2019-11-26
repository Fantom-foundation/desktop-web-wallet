import { IModalState } from ".";
import { MODAL_ACTIONS } from "./constants";

export const modalShow = (current: IModalState['current']) => ({
  type: MODAL_ACTIONS.SHOW_MODAL,
  current,
})

export const modalHide = () => ({
  type: MODAL_ACTIONS.HIDE_MODAL,
})