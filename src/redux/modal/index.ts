import { createReducer } from "~/utility/createReducer";
import { MODAL_HANDLERS } from "./handlers";
import { MODALS } from "./constants";


export interface IModalState {
  isOpened: boolean,
  current: typeof MODALS[keyof typeof MODALS] | null,
}

export const MODAL_INITIAL_STATE: IModalState = {
  isOpened: false,
  current: null,
}

export const modal = createReducer(MODAL_INITIAL_STATE, MODAL_HANDLERS);