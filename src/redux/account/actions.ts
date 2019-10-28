import { IAccountState } from ".";
import { ACCOUNT_ACTIONS } from "./constants";

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