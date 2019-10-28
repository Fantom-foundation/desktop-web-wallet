import { IState } from "~/redux/";

export const selectAccountCreate = (state: IState) => state.account.create;
export const selectAccount = (state: IState) => state.account;