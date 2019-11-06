import Web3 from 'web3';
import { IAccountState } from '.';
import { reject, isNil } from 'ramda';

export const validateAccountTransaction = ({
  from,
  to,
  amount,
  privateKey,
  balance,
}: {
  from: string;
  to: string;
  amount: number;
  privateKey: string;
  balance: number;
}): IAccountState['transfer']['errors'] => reject(isNil)({
  from: !Web3.utils.isAddress(from) ? 'Not a valid recipient' : null,
  to: !Web3.utils.isAddress(to) ? 'Not a valid sender' : null,
  amount: !amount || amount <= 0 ? 'Please, enter valid amount' : null,
  password: !privateKey ? 'Password is incorrect' : null,
  balance: amount && balance < amount ? `Not enough funds, your balance is only ${balance} FTM` : null,
});
