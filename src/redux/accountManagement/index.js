import Tx from 'ethereumjs-tx';
import Hdkey from 'hdkey';
import EthUtil from 'ethereumjs-util';
import keythereum from 'keythereum';
import Bip39 from 'bip39';
import Web3 from 'web3';
import axios from 'axios';
import { getStore } from '~/redux/store';
import config from '~/redux/config';

/**
 * @param {Public Address} address
 * This method will resolve the nonce for the particular account
 */
function getNonceFantom(address) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${config.apiUrl}/account/${address}`)
      .then(response => {
        resolve(response.data.nonce);
        return true;
      })
      .catch(error => {
        reject(error);
        return true;
      });
  });
}

/**
 * transferFantom()  : To transfer funds via testnet's own endpoint
 *@param {*} from : Address of account from which to transfer.
 *@param {*} to : Address of account to whom to transfer.
 *@param {*} value : Amount to be transfered.
 *@param {*} memo : : Message text for transaction.
 *@param {*} privateKey : Private key of account from which to transfer.
 */
export function transferFantom(from, to, value, memo, privateKey, transferMoney, getBalance) {
  return new Promise((resolve, reject) => {
    getNonceFantom(from)
      .then(count => {
        const privateKeyBuffer = EthUtil.toBuffer(privateKey);
        const rawTx = {
          from,
          to,
          value: Web3.utils.toHex(Web3.utils.toWei(value, 'ether')),
          gasPrice: '0x000000000001',
          gasLimit: '0x27100',
          nonce: Web3.utils.toHex(count),
          data: memo,
        };
        const tx = new Tx(rawTx);
        tx.sign(privateKeyBuffer);
        const serializedTx = tx.serialize();

        const hexTx = `0x${serializedTx.toString('hex')}`;
        axios
          .post(`${config.apiUrl}/sendRawTransaction`, hexTx)
          .then(response => {
            if (response && response.data && response.data.txHash) {
              const transferData = {
                from,
                to,
                amount: value,
                memo,
                hexTx: response.data.txHash,
                date: new Date().getTime(),
              };
              transferMoney(transferData);
              getBalance(from);
              resolve({ success: true, hash: response.data.txHash });
            } else {
              reject({ message: 'Invalid response received' });
            }
            return true;
          })
          .catch(error => {
            reject(error);
          });
        return true;
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err, 'err');
        reject({ success: false });
      });
  });
}

/**
 * @param {To get Selected Account index} location
 * @param {Accounts list} accountsList
 * This method will check whether the account password is correct or not
 */
export async function isAccountPasswordCorrect(account, password) {
  if (account && account.keystore) {
    const isPasswordCorrectPromise = new Promise((resolve, reject) => {
      keythereum.recover(password, account.keystore, dataRes => {
        if (dataRes instanceof Buffer) {
          const hexVal = EthUtil.bufferToHex(dataRes);
          resolve({ success: true, result: hexVal });
        }
        if (dataRes instanceof Error) {
          reject({ error: true, message: 'Invalid Password.' });
        }
        reject({ error: true, message: 'Invalid Password.' });
      });
    });

    const resolvePromise = await isPasswordCorrectPromise;
    return resolvePromise;
  }
  return { error: true, message: 'Unable to read data.' };
}

/**
 * @param {Generated Mnemonic} mnemonic
 * This method will return the public, private keys
 */
export function walletSetup(mnemonic) {
  const seed = Bip39.mnemonicToSeed(mnemonic);
  const root = Hdkey.fromMasterSeed(seed);
  // const masterKey = root.privateKey.toString('hex');
  const addrNode = root.derive("m/44'/60'/0'/0/0");
  const pubKey = EthUtil.privateToPublic(addrNode._privateKey); //eslint-disable-line
  const addr = EthUtil.publicToAddress(pubKey).toString('hex');
  const publicAddress = EthUtil.toChecksumAddress(addr);
  // eslint-disable-next-line no-underscore-dangle
  const privateKey = EthUtil.bufferToHex(addrNode._privateKey);

  return { publicAddress, privateKey };
}

/**
 *
 * @param {String} address
 * To get data of file having keystore contain address.
 */
export const getKeystoreDataOfAddress = address =>
  new Promise((resolve, reject) => {
    const store = getStore();
    const state = store.getState();
    const accountsList =
      state.accounts && state.accounts.accountsList ? state.accounts.accountsList : [];
    if (accountsList && accountsList.length) {
      for (let i = 0; i < accountsList.length; i += 1) {
        if (accountsList[i].publicAddress === address) {
          resolve({ success: true, result: accountsList[i].keystore });
        }
      }
    }
    reject({ error: true, message: 'Not able to get keystore.' });
  });

/**
 *
 * @param {String} address
 * @param {String} password
 * To get private key from keystore. We just need to pass
 * public address and password.
 */
export const getPrivateKeyOfAddress = (address, password) =>
  new Promise((resolve, reject) => {
    getKeystoreDataOfAddress(address)
      .then(result => {
        if (result.success && result.result) {
          keythereum.recover(password, result.result, dataRes => {
            if (dataRes instanceof Buffer) {
              const hexVal = EthUtil.bufferToHex(dataRes);

              resolve({ success: true, result: hexVal });
            } else if (dataRes instanceof Error) {
              reject(dataRes);
            } else {
              reject(new Error('Invalid Password.'));
            }
          });
        } else {
          reject(new Error('Unable to read data.'));
        }
        return true;
      })
      .catch(err => {
        reject(err);
      });
  });
