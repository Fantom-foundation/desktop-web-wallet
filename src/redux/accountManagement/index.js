import Tx from 'ethereumjs-tx';
import Hdkey from 'hdkey';
import EthUtil from 'ethereumjs-util';
import keythereum from 'keythereum';
import Bip39 from 'bip39';
import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));

/**
 * @param {To get Selected Account index} location
 * @param {Accounts list} accountsList
 * @param {Transfer Money Action} transferMoney
 * @param {Get balance Action} getBalance
 * This method will transfer the fantom from one account to another
 */
export function transferMoneyViaFantom(location, accountsList, transferMoney, getBalance) {
  const { state } = location;
  const account = accountsList[state.selectedAccountIndex];
  const seed = Bip39.mnemonicToSeed(account.mnemonic);
  const root = Hdkey.fromMasterSeed(seed);
  const addrNode = root.derive("m/44'/60'/0'/0/0");
  // eslint-disable-next-line no-underscore-dangle
  const privateKey = EthUtil.bufferToHex(addrNode._privateKey);
  return new Promise((resolve, reject) => {
    web3.eth
      .getTransactionCount(account.publicAddress)
      .then(count => {
        const privateKeyBuffer = EthUtil.toBuffer(privateKey);
        web3.eth.getGasPrice((err, result) => {
          const rawTx = {
            from: account.publicAddress,
            to: '0x4131E8Cc03EE8cBA157bfED6303c46346A106119',
            value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
            gasLimit: web3.utils.toHex(22000),
            gasPrice: web3.utils.toHex(result),
            nonce: web3.utils.toHex(count),
            data: 'memo',
          };
          const tx = new Tx(rawTx);
          tx.sign(privateKeyBuffer);
          const serializedTx = tx.serialize();
          const hexTx = `0x${serializedTx.toString('hex')}`;
          transferMoney(hexTx);
          getBalance(account.publicAddress);
        });
        resolve({ isTransferred: true, message: 'Fantom Transferred successfully' });
      })
      .catch(() => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ isTransferred: false, message: 'Fantom Transferred successfully' });
      });
  });
}

/**
 * @param {To get Selected Account index} location
 * @param {Accounts list} accountsList
 * This method will check whether the account password is correct or not
 */
export function isAccountPasswordCorrect(location, accountsList) {
  const { state } = location;
  const account = accountsList[state.selectedAccountIndex];
  if (account.keystore) {
    return new Promise((resolve, reject) => {
      keythereum.recover('aaaaaaaaA1', account.keystore, dataRes => {
        if (dataRes instanceof Buffer) {
          const hexVal = EthUtil.bufferToHex(dataRes);
          resolve({ success: true, result: hexVal });
        }
        if (dataRes instanceof Error) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ error: true, message: 'Invalid Password.' });
        }
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ error: true, message: 'Invalid Password.' });
      });
    });
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
