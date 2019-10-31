import { IState } from "~/redux/";

export const selectAccount = (state: IState) => state.account;
export const selectAccountCreate = (state: IState) => state.account.create;
export const selectAccountTransfer = (state: IState) => state.account.transfer;