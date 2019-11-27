import { IAccountResponse } from '~/redux/transactions/types';
import Web3 from 'web3';

export const mockGetTransactions = async (
  address: string
): Promise<IAccountResponse> =>
  new Promise(resolve => {
    setTimeout(
      () =>
        resolve({
          balance: Web3.utils.toWei('0.1'),
          nonce: 1,
          transactions: [...new Array(12)].map(() => ({
            hash: '0xrAnDoMHaSh',
            nonce: Math.floor(Math.random() * 10),
            timestamp: new Date().getTime(),
            ...(Math.random() * 2 > 1
              ? { from: address, to: '0xSOMEADDRESSTRANSACTIONWASSENTTO' }
              : { from: '0xSOMEADDRESSTRANSACTIONWASSENTFROM', to: address }),
          })),
        }),
      300
    );
  });
