import { IAccountResponse } from '~/redux/transactions/types';
import Web3 from 'web3';

export const mockGetTransactions = async (
  address: string,
  offset: number,
  count?: number
): Promise<{ data: IAccountResponse }> =>
  new Promise(resolve => {
    setTimeout(
      () =>
        resolve({
          data: {
            balance: Web3.utils.toWei(Math.random().toFixed(6).toString()),
            nonce: 1,
            transactions: [...new Array(12)].map((el, index) => ({
              hash: `0x${offset}z${count}zSoMerAnDoMHaShForTransaction123123${index}`,
              _id: `0x${offset}z${count}zSoMerAnDoMHaShForTransaction123123${index}`,
              nonce: Math.floor(Math.random() * 10),
              value: Web3.utils.toWei(Math.random().toFixed(6).toString()),
              fee: Web3.utils.toWei(Math.random().toFixed(6).toString()),
              timestamp: new Date().getTime(),
              ...(Math.random() * 2 > 1
                ? { from: address, to: '0xSOMEADDRESSTRANSACTIONWASSENTTO' }
                : { from: '0xSOMEADDRESSTRANSACTIONWASSENTFROM', to: address }),
            })),
          },
        }),
      300
    );
  });
