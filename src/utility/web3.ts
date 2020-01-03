import Web3 from 'web3';
import Transaction from 'ethereumjs-tx';
import * as EthUtil from 'ethereumjs-util';
import Bip39 from 'bip39';
import Hdkey from 'hdkey';
import { EncryptedKeystoreV3Json } from 'web3-core';
import { IAccount, INodeRecord } from '~/redux/account/types';
import keythereum from 'keythereum';
import BigInt from 'big-integer';
import { abi, contractFunctions} from './constants'

const {
  REACT_APP_EXAMPLE_ADDRESS,
  REACT_APP_API_URL_WEB3,
} = process.env;

export const DEFAULT_PROVIDERS: INodeRecord[] = [
  { address: REACT_APP_API_URL_WEB3 || "" },
  { address: 'ws://18.189.195.64:4501' },
  { address: 'ws://18.191.96.173:4502' },
  { address: 'ws://3.15.138.107:4500' },
];


export interface ITransfer {
  from: string;
  to: string;
  value: string;
  memo: string;
  privateKey: string;
  gasLimit?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  web3Sfc?: any;
}

class Web3Agent {
  web3: Web3 | null = null;

  sfc = {};

  async isConnected() {
    if (!this.web3) return false;
    return !!(await this.web3.eth.getNodeInfo());
  }

  async init() {
    this.web3 = new Web3(new Web3.providers.HttpProvider(REACT_APP_API_URL_WEB3|| ""));
  }

  constructor() {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(REACT_APP_API_URL_WEB3|| "")
    );
  }

  async getBalance(address: string = REACT_APP_EXAMPLE_ADDRESS) {
    if (!this.web3 || !(await this.isConnected()))
      throw new Error('Not connected');

    const res = await this.web3.eth.getBalance(address);
    return res;
  }

  async setProvider(url: string) {
    const prov = new Web3.providers.HttpProvider(REACT_APP_API_URL_WEB3 || "");

    if (!this.web3) {
      this.web3 = new Web3(prov);
    } else {
      this.web3.setProvider(prov);
    }

   

    try {
      return !!(await this.web3.eth.getNodeInfo());
    } catch (e) {
      return false;
    }
  }

  async delegateStake({ amount, publicKey, privateKey, validatorId }) {
    const web3 = new Web3(new Web3.providers.HttpProvider(REACT_APP_API_URL_WEB3 || ''));
    const sfc = new web3.eth.Contract(contractFunctions, "0xfc00face00000000000000000000000000000000");
    return this.transfer({
      from: publicKey,
      to: '0xfc00face00000000000000000000000000000000',
      value: amount,
      memo: sfc.methods.createDelegation(validatorId).encodeABI(),
      privateKey,
      gasLimit: 200000,
      web3Sfc: web3,
    });
  }

  
async deligateUnstake({
  publicKey,
}) {
  const web3 = new Web3(new Web3.providers.HttpProvider(REACT_APP_API_URL_WEB3 || ''));

  const sfc = new web3.eth.Contract(abi, "0xfa00face00fc0000000000000000000000000100");
  sfc.methods.prepareToWithdrawDelegation().call({from: publicKey}, function(error, result){
    console.log(result, '***sdfksfsd')
    console.log(error, '***sdfksfsd1')
    if(result){
      return true
    }
    return false
});
}

  async transfer({
    from,
    to,
    value,
    memo,
    privateKey,
    gasLimit = 44000,
    web3Sfc,
  }: ITransfer) {
    if (!this.web3 || !(await this.isConnected()))
      throw new Error('Not connected');


    const web3 = web3Sfc || this.web3;
    const nonce = await web3.eth.getTransactionCount(from);
    const gasPrice = await web3.eth.getGasPrice();

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

    const tx = new Transaction(rawTx);

    tx.sign(privateKeyBuffer);
    const serializedTx = tx.serialize();

    web3.eth
      .sendSignedTransaction(`0x${serializedTx.toString('hex')}`)
      .then(res => {
        console.log(res, '******res');
        return res;
      }).catch(err => {
        console.log('******err', err)

      });
  }

  async estimateFee({
    from,
    to,
    value,
    memo,
  }: Pick<ITransfer, 'from' | 'to' | 'value' | 'memo'>): Promise<string> {
    if (!this.web3 || !(await this.isConnected()))
      throw new Error('Not connected');

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

  getCurrentEpoch(from, sfc) {
    return new Promise(resolve => {
      sfc.methods.currentEpoch().call({ from }, function(error, result) {
        if (!error) {
          resolve(result);
        }
        console.log(error, "errorerror getCurrentEpoch");
      });
    });
  }

  getDelegate(from, delegateAddress, sfc) {
    return new Promise(resolve => {
      sfc.methods
        .delegations(delegateAddress)
        .call({ from }, function(error, result) {
          if (!error) resolve(result);
          console.log(error, "errorerror getDelegate");
        });
    });
  }



  async getDelegationPendingRewards(from, delegateAddress) {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(REACT_APP_API_URL_WEB3 || '')
    );
    const sfc = new web3.eth.Contract(
      contractFunctions,
      "0xfc00face00000000000000000000000000000000"
    );
    // Get delegator info and current epoch - 1 (i.e the previous sealed epoch)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const info:any = await Promise.all([
      this.getCurrentEpoch(from, sfc),
      this.getDelegate(from, delegateAddress, sfc)||{},
    ]);
    const maxEpochs = Number(info[0]) - 1;
    const fromEpoch = info[1].paidUntilEpoch;
    return new Promise(resolve => {
      sfc.methods
        .calcDelegationRewards(delegateAddress, fromEpoch, maxEpochs)
        .call({ from }, function(error, result) {
          resolve(parseFloat(result["0"]) / 10 ** 18);
        });
    });
  }

  getKeystore = (
    privateKey: string,
    password: string
  ): EncryptedKeystoreV3Json => {
    if (!this.web3) throw new Error('not inialized');

    return this.web3.eth.accounts.encrypt(privateKey, password);
  };

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
}

const Fantom = new Web3Agent();

export { Fantom };
