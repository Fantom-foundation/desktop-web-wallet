interface IAccountTransaction {
  hash: string;
  nonce: number;
  from: string;
  to: string;
  timestamp: number;
}

export interface IAccountResponse {
  balance: string;
  nonce: number;
  transactions: IAccountTransaction[];
}
