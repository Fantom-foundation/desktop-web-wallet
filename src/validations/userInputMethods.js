import Web3 from 'web3';
import BigInt from 'big-integer';

export default class ValidationMethods {
  /**
   * @param {Name of the key} key
   * @param {Password} password
   * This method will check if the password is correct or not
   */
  isPasswordCorrect(key, password) {
    const obj = {
      containNumber: true,
      containCapitalLetter: true,
      hasLengthGreaterThanEight: true,
    };
    if (key === 'password') {
      if (password) {
        // check it contains at least 1 number
        if (!/\d/.test(password)) {
          obj.containNumber = false;
        }
        // check it contains at least 1 Capital letter
        if (password.toLowerCase() === password) {
          obj.containCapitalLetter = false;
        }
        // check it has length of 8 characters
        if (password.length < 8) {
          obj.hasLengthGreaterThanEight = false;
        }
        return obj;
      }
      return {
        containNumber: false,
        containCapitalLetter: false,
        hasLengthGreaterThanEight: false,
      };
    }
    return obj;
  }

  /**
   * @param {Data to be splitted} data
   * This method will return array of the space seperated string
   */
  getSplittedArray(data) {
    if (data) {
      const spaceSeperated = data.split(' ');
      if (spaceSeperated.length > 1) {
        return spaceSeperated;
      }
    }

    return [];
  }

  /**
   * @param {String to be checked} str
   * This method will return boolean whether the string contains the special chars or not
   */
  noSpecialChars(str) {
    const string = String(str);
    return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?_.()@]/g.test(string);
  }

  /**
   * @param {String} str
   * This method will return the no of upper case letters in the string
   */
  getNoOfUppercaseLetters(str) {
    let count = 0;
    const stringLength = str.length;
    for (let i = 0; i < stringLength; i += 1) {
      const character = str.charAt(i);
      if (character >= 'A' && character <= 'Z') {
        count += 1;
      }
    }
    return count;
  }

  toFixed(num, fixed) {
    const re = new RegExp(`^-?\\d+(?:.\\d{0,${fixed || -1}})?`);
    return num.toString().match(re)[0];
  }

  getFormattedBalances(balance, gasPrice) {
    const balanceCurrent = balance;
    let balanceCanTransfer = BigInt(balanceCurrent).minus(gasPrice);
    balanceCanTransfer = Web3.utils.fromWei(`${balanceCanTransfer}`, 'ether');

    let valInEther = Web3.utils.fromWei(`${balance}`, 'ether');
    balanceCanTransfer = this.toFixed(balanceCanTransfer, 4);
    valInEther = this.toFixed(valInEther, 4);

    return { balance: valInEther, maxFantomBalance: balanceCanTransfer };
  }
}
