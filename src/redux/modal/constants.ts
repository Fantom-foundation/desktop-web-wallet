import { TransferModal } from "~/view/pages/modals/TransferModal"

export const MODALS = {
  TRANSFERS: 'TRANSFERS',
}

export const MODAL_CONTENT = {
  [MODALS.TRANSFERS]: TransferModal,
}

export interface IModalChildProps {
  onClose?: () => void;
}

const prefix = 'MODAL';

export const MODAL_ACTIONS = {
  SHOW_MODAL: `${prefix}.SHOW_MODAL`,
  HIDE_MODAL: `${prefix}.HIDE_MODAL`,
}