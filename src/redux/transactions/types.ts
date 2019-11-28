export interface IAccountTransaction {
  hash: string;
  nonce: number;
  from: string;
  to: string;
  timestamp: number;
  value: string;
}

export interface IAccountResponse {
  balance: string;
  nonce: number;
  transactions: IAccountTransaction[];
}