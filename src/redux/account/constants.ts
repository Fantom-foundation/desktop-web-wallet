import { IAccount } from "./types";

const prefix = 'ACCOUNT.';

export const ACCOUNT_ACTIONS = {
  SET_CREATE: `${prefix}SET_CREATE`,
  SET_CREATE_STAGE: `${prefix}SET_CREATE_STAGE`,
  SET_ACCOUNT: `${prefix}SET_ACCOUNT`,
  SET: `${prefix}SET`,
  SET_CONNECTION: `${prefix}SET_CONNECTION`,
  GET_FTM_TO_USD: `${prefix}GET_FTM_TO_USD`,
  SET_FTM_USD: `${prefix}SET_FTM_TO_USD`,
  
  CREATE_SET_CREDENTIALS: `${prefix}CREATE_SET_CREDENTIALS`,
  CREATE_SET_RESTORE_CREDENTIALS: `${prefix}CREATE_SET_RESTORE_CREDENTIALS`,  
  CREATE_SET_INFO: `${prefix}CREATE_SET_INFO`,
  CREATE_SET_CONFIRM: `${prefix}CREATE_SET_CONFIRM`,
  CREATE_CANCEL: `${prefix}CREATE_CANCEL`,
  CREATE_CLEAR: `${prefix}CREATE_CLEAR`,
  CREATE_RESTORE_MNEMONICS: `${prefix}CREATE_RESTORE_MNEMONICS`,
  
  SET_LIST: `${prefix}SET_LIST`,
  ADD_ACCOUNT: `${prefix}ADD_ACCOUNT`,

  GET_BALANCE: `${prefix}GET_BALANCE`,
  GET_PRIVATE_KEY: `${prefix}GET_PRIVATE_KEY`,
  
  SEND_FUNDS: `${prefix}SEND_FUNDS`,
  TRANSFER_CLEAR: `${prefix}TRANSFER_CLEAR`,
  SET_TRANSFER: `${prefix}SET_TRANSFER`,
  SET_TRANSFER_ERRORS: `${prefix}SET_TRANSFER_ERRORS`,
  GET_TRANSFER_FEE: `${prefix}GET_TRANSFER_FEE`,
  SET_TRANSFER_FEE: `${prefix}SET_TRANSFER_FEE`,

  UPLOAD_KEYSTORE: `${prefix}UPLOAD_KEYSTORE`,

  CHANGE_PROVIDER: `${prefix}CHANGE_PROVIDER`,
  ADD_PROVIDER: `${prefix}ADD_PROVIDER`,
  PROVIDER_CONNECTED: `${prefix}PROVIDER_CONNECTED`,
  RECONNECT_PROVIDER: `${prefix}RECONNECT_PROVIDER`,
}

export const EMPTY_ACCOUNT: IAccount = {
  publicAddress: '',
  balance: '0', 
  icon: '', 
  keystore: null,

  is_loading_balance: false, 
}

export const CONFIRMATION_PHRASE = "I have written down the phrase"; 