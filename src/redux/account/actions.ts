import { IAccountState } from ".";
import { ACCOUNT_ACTIONS } from "./constants";

export const accountSetCreate = (create: Partial<IAccountState['create']>) => ({
  type: ACCOUNT_ACTIONS.SET_CREATE,
  create,
})

export const accountCreateSetCredentials = (create: Partial<IAccountState['create']>) => ({
  type: ACCOUNT_ACTIONS.CREATE_SET_CREDENTIALS,
  create,
});