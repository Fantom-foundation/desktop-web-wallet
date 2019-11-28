import { IState } from "~/redux/store";

export const selectTransactions = (state: IState) => state.transactions
export const selectTransactionsList = (state: IState) => state.transactions.list