import Web3 from 'web3';
import { Transaction } from 'ethereumjs-tx';
import EthUtil from 'ethereumjs-util';

const { REACT_APP_API_URL_FANTOM, REACT_APP_KEY_INFURA, REACT_APP_EXAMPLE_ADDRESS } = process.env;

const URL_FANTOM = REACT_APP_API_URL_FANTOM;
const URL_ETHEREUM = `https://rinkeby.infura.io/v3/${REACT_APP_KEY_INFURA}`;

export interface ITransfer {
  from: string;
  to: string;
  value: string;
  memo: string;
  private_key: string;
}

class Web3Agent {
  constructor(url: string) {
    this.web3 = new Web3(new Web3.providers.HttpProvider(url));
  }

  web3: Web3;

  async getBalance(address: string = REACT_APP_EXAMPLE_ADDRESS) {
    const res = await this.web3.eth.getBalance(address);
    return res;
  }

  async transfer({ from, to, value, memo, private_key }: ITransfer) {
    const nonce = await this.web3.eth.getTransactionCount(from);
    const gasPrice = await this.web3.eth.getGasPrice();

    const rawTx = {
      from,
      to,
      value: Web3.utils.toHex(Web3.utils.toWei(value, 'ether')),
      gasLimit: Web3.utils.toHex(22000),
      gasPrice: Web3.utils.toHex(gasPrice),
      nonce: Web3.utils.toHex(nonce),
      data: memo,
    };

    const privateKeyBuffer = EthUtil.toBuffer(private_key);

    const tx = new Transaction(rawTx);
    tx.sign(privateKeyBuffer);
    const serializedTx = tx.serialize();

    const res = await this.web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`);
    return res;
  }
}

const Fantom = new Web3Agent(URL_FANTOM);
const Ethereum = new Web3Agent(URL_ETHEREUM);

export { Fantom, Ethereum };
