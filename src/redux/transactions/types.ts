export interface IAccountTransaction {
  hash: string;
  nonce: number;
  from: string;
  to: string;
  timestamp: number;
  value: string;
  _id: string;
  fee: string;
}

export interface IAccountResponse {
  balance: string;
  nonce: number;
  transactions: IAccountTransaction[];
}