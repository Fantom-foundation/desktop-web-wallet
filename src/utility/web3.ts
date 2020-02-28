/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3 from 'web3';
import Tx from 'ethereumjs-tx';
import * as EthUtil from 'ethereumjs-util';
import Bip39 from 'bip39';
import Hdkey from 'hdkey';
import { EncryptedKeystoreV3Json } from 'web3-core';
import { IAccount, INodeRecord } from '~/redux/account/types';
import keythereum from 'keythereum';
import BigInt from 'big-integer';
import { contractFunctions } from './constants';

const {
  REACT_APP_API_URL_FANTOM,
  REACT_APP_API_URL_WEB3,
  API_URL_FANTOM,
  KEY_INFURA,
} = process.env;

export const DEFAULT_PROVIDERS: INodeRecord[] = [
  { address: REACT_APP_API_URL_WEB3 || '' },
  { address: 'ws://18.189.195.64:4501' },
  { address: 'ws://18.191.96.173:4502' },
  { address: 'ws://3.15.138.107:4500' },
];

// const Web3 = require("web3");
// const Tx = require("ethereumjs-tx");
type Transfer = {
  from: string;
  to: string;
  value: string;
  memo: string;
  privateKey: string;
  gasLimit?: number;
  web3Delegate?: any;
  cb?: () => {};
};

export interface ITransfer {
  from: string;
  to: string;
  value: string;
  memo: string;
  privateKey: string;
  gasLimit?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  web3Delegate?: any;
}
class Web3Agent {
  constructor() {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(REACT_APP_API_URL_WEB3 || '')
    );
  }

  web3: any = null;

  sfc: any = null;

  async getBalance(address) {
    const res = await this.web3.eth.getBalance(address);
    return res;
  }

  async isConnected() {
    if (!this.web3) return false;
    return !!(await this.web3.eth.getNodeInfo());
  }

  async setProvider() {
    const prov = new Web3.providers.HttpProvider(REACT_APP_API_URL_WEB3 || '');

    if (!this.web3) {
      this.web3 = new Web3(prov);
    } else {
      this.web3.setProvider(prov);
    }
  }

  getKeystore = (
    privateKey: string,
    password: string
  ): EncryptedKeystoreV3Json => {
    if (!this.web3) throw new Error('not inialized');

    return this.web3.eth.accounts.encrypt(privateKey, password);
  };
  // Get info on delegator

  getDelegate(from, delegateAddress, sfc) {
    return new Promise(resolve => {
      sfc.methods
        .delegations(delegateAddress)
        .call({ from }, (error, result) => {
          if (!error) resolve(result);
        });
    });
  }

  validateKeystore = (keystore: EncryptedKeystoreV3Json, password: string) => {
    if (!this.web3) throw new Error('not inialized');

    return this.web3.eth.accounts.decrypt(keystore, password);
  };

  getPrivateKey = (
    keystore: IAccount['keystore'],
    password: string
  ): Promise<string | null> =>
    new Promise(resolve =>
      keythereum.recover(password, keystore, dataRes => {
        resolve(
          dataRes instanceof Buffer ? EthUtil.bufferToHex(dataRes) : null
        );
      })
    );
  // Get current epoch

  getCurrentEpoch(from, sfc) {
    return new Promise(resolve => {
      sfc.methods.currentEpoch().call({ from }, (error, result) => {
        if (!error) {
          resolve(result);
        }
      });
    });
  }

  async estimateFee({
    from,
    to,
    value,
    memo,
  }: Pick<ITransfer, 'from' | 'to' | 'value' | 'memo'>): Promise<string> {
    const gasPrice = await this.web3.eth.getGasPrice();
    const gasLimit = await this.web3.eth.estimateGas({
      from,
      to,
      value: Web3.utils.toHex(Web3.utils.toWei(value, 'ether')),
      data: Web3.utils.asciiToHex(memo),
    });

    const fee = Web3.utils.fromWei(
      BigInt(gasPrice.toString())
        .multiply(BigInt(gasLimit.toString()))
        .toString()
    );

    return fee;
  }
  // Get info on delegator

  async getDelegationPendingRewards(from, delegateAddress) {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(REACT_APP_API_URL_WEB3 || '')
    );
    const sfc = new web3.eth.Contract(
      contractFunctions,
      '0xfc00face00000000000000000000000000000000'
    );
   
    const info: any = await Promise.all([
      this.getCurrentEpoch(from, sfc),
      this.getDelegate(from, delegateAddress, sfc) || {},
    ]);
    const maxEpochs = Number(info[0]) - 1;
    const fromEpoch = info[1].paidUntilEpoch;
    return new Promise(resolve => {
      sfc.methods
        .calcDelegationRewards(delegateAddress, fromEpoch, maxEpochs)
        .call({ from }, (error, result) => {
          if (result) {
            resolve({
              pendingRewards: parseFloat(result['0']) / 10 ** 18,
              data: info[1],
            });
          } else {
            resolve({ pendingRewards: 0, data: info[1] });
          }
        });
    });
  }

  async delegateStake({ amount, publicKey, privateKey, validatorId }) {
   

    const web3 = new Web3(
      new Web3.providers.HttpProvider(REACT_APP_API_URL_WEB3 || '')
    );

    const web3Sfc = new web3.eth.Contract(
      contractFunctions,
      '0xfc00face00000000000000000000000000000000'
    );

   

    return this.transfer({
      from: publicKey,
      to: '0xfc00face00000000000000000000000000000000',
      value: amount,
      memo: web3Sfc.methods.createDelegation(validatorId).encodeABI(),
      privateKey,
      gasLimit: 200000,
      web3Delegate: web3,
    });
  }

  async restoreWallet(privateKey) {
    const wallet = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    return wallet;
  }

  async getTransactionFee(gasLimit) {
    const gasPrice = await this.web3.eth.getGasPrice();
    const fee = Web3.utils.fromWei(
      BigInt(gasPrice.toString())
        .multiply(BigInt(gasLimit.toString()))
        .toString()
    );
    return fee;
  }

  async transfer({
    from,
    to,
    value,
    memo = '',
    privateKey,
    gasLimit = 44000,
    web3Delegate = '',
  }: // cb,
  Transfer) {
    const useWeb3 = web3Delegate || this.web3;
    const nonce = await useWeb3.eth.getTransactionCount(from);
    const gasPrice = await useWeb3.eth.getGasPrice();

    const rawTx = {
      from,
      to,
      value: Web3.utils.toHex(Web3.utils.toWei(value, 'ether')),
      gasLimit: Web3.utils.toHex(gasLimit),
      gasPrice: Web3.utils.toHex(gasPrice),
      nonce: Web3.utils.toHex(nonce),
      data: memo,
    };

    const privateKeyBuffer = EthUtil.toBuffer(privateKey);
    const tx = new Tx(rawTx);
    tx.sign(privateKeyBuffer);
    const serializedTx = tx.serialize();
    const res = await useWeb3.eth.sendSignedTransaction(
      `0x${serializedTx.toString('hex')}`
    );
    localStorage.setItem('txHash', res.transactionHash);
    
    return res;
  }

  async delegateUnstake(publicKey, privateKey) {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(REACT_APP_API_URL_WEB3 || '')
    );
    const web3Sfc = new web3.eth.Contract(
      contractFunctions,
      '0xfc00face00000000000000000000000000000000'
    );
    return this.transfer({
      from: publicKey,
      to: '0xfc00face00000000000000000000000000000000',
      value: '0',
      memo: web3Sfc.methods.prepareToWithdrawDelegation().encodeABI(),
      privateKey,
      gasLimit: 200000,
      web3Delegate: web3,
    });
  }

  async withdrawDelegateAmount(publicKey, privateKey) {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(REACT_APP_API_URL_WEB3 || '')
    );

    const web3Sfc = new web3.eth.Contract(
      contractFunctions,
      '0xfc00face00000000000000000000000000000000'
    );
    return this.transfer({
      from: publicKey,
      to: '0xfc00face00000000000000000000000000000000',
      value: '0',
      memo: web3Sfc.methods.withdrawDelegation().encodeABI(),
      privateKey,
      gasLimit: 200000,
      web3Delegate: web3,
    });
  }

  mnemonicToKeys = (mnemonic: string): { publicAddress; privateKey } => {
    const seed = Bip39.mnemonicToSeed(mnemonic);
    const root = Hdkey.fromMasterSeed(seed);

    const addrNode = root.derive("m/44'/60'/0'/0/0");
    const pubKey = EthUtil.privateToPublic(addrNode._privateKey);
    const addr = EthUtil.publicToAddress(pubKey).toString('hex');
    const publicAddress = EthUtil.toChecksumAddress(addr);
    const privateKey = EthUtil.bufferToHex(addrNode._privateKey);

    return { publicAddress, privateKey };
  };

  privateKeyToKeys = (privateKey: string): { publicAddress; privateKey } => {
    const privateKeyBuffer = EthUtil.toBuffer(privateKey);

    const pubKey = EthUtil.privateToPublic(privateKeyBuffer);
    const addr = EthUtil.publicToAddress(pubKey).toString('hex');
    const publicAddress = EthUtil.toChecksumAddress(addr);

    return { publicAddress, privateKey };
  };

  async getAccount(address: string) {
    // eslint-disable-next-line no-return-await
    return await fetch(
      `${REACT_APP_API_URL_FANTOM}api/v1/get-account?address=${address}`
    );
  }
}

const Fantom = new Web3Agent();

export { Fantom };
