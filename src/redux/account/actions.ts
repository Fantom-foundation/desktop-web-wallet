import { IAccountState } from ".";
import { ACCOUNT_ACTIONS } from "./constants";
import { IAccount } from "./types";

export const accountSetCreate = (create: Partial<IAccountState['create']>) => ({
  type: ACCOUNT_ACTIONS.SET_CREATE,
  create,
})

export const accountSetCreateStage = (stage: Partial<IAccountState['create']['stage']>) => ({
  type: ACCOUNT_ACTIONS.SET_CREATE_STAGE,
  stage,
})

export const accountCreateSetCredentials = (create: Partial<IAccountState['create']>) => ({
  type: ACCOUNT_ACTIONS.CREATE_SET_CREDENTIALS,
  create,
});

export const accountCreateSetInfo = () => ({
  type: ACCOUNT_ACTIONS.CREATE_SET_INFO,
});

export const accountCreateSetConfirm = () => ({
  type: ACCOUNT_ACTIONS.CREATE_SET_CONFIRM,
});

export const accountCreateCancel = () => ({
  type: ACCOUNT_ACTIONS.CREATE_CANCEL,
});

export const accountSetList = (list: IAccountState['list']) => ({
  type: ACCOUNT_ACTIONS.SET_LIST,
  list,
});

export const accountAddAccount = (account: IAccount) => ({
  type: ACCOUNT_ACTIONS.ADD_ACCOUNT,
  account,
});