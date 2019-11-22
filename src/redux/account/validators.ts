import Web3 from 'web3';
import { IAccountState } from '.';
import { reject, isNil } from 'ramda';
import BigNum from 'big-integer';

export const validateAccountTransaction = ({
  from,
  to,
  amount,
  privateKey,
  balance,
  fee,
}: {
  from: string;
  to: string;
  amount: string;
  privateKey: string;
  balance: string;
  fee: string;
}): IAccountState['transfer']['errors'] =>
  reject(isNil)({
    from: !Web3.utils.isAddress(from) ? 'Not a valid recipient' : null,
    to: !Web3.utils.isAddress(to) ? 'Not a valid sender' : null,
    amount:
      !parseFloat(amount) || parseFloat(amount) <= 0
        ? 'Please, enter valid amount'
        : null,
    password: !privateKey ? 'Password is incorrect' : null,
    balance:
      amount &&
      BigNum(Web3.utils.toWei(balance))
        .minus(Web3.utils.toWei(fee))
        .compare(Web3.utils.toWei(amount)) < 0
        ? `Not enough funds, your balance is only ${balance} FTM`
        : null,
  });

export const isNodeAddress = (address: string): boolean =>
  !!address &&
  !!address.match(
    /^(wss?:\/\/)([0-9]{1,3}(?:\.[0-9]{1,3}){3}|[a-zA-Z]+):([0-9]{1,5})$/
  );
