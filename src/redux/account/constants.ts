import { IAccount } from "./types";

const prefix = 'ACCOUNT.';

export const ACCOUNT_ACTIONS = {
  SET_CREATE: `${prefix}SET_CREATE`,
  SET_CREATE_STAGE: `${prefix}SET_CREATE_STAGE`,
  SET_ACCOUNT: `${prefix}SET_ACCOUNT`,
  
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
}

export const EMPTY_ACCOUNT: IAccount = {
  name: '',
  public_address: '',
  balance: 0,
  icon: '', 
  keystore: null,

  is_loading_balance: false,
}