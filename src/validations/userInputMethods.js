export default class ValidationMethods {
  /**
   * @param {Name of the key} key
   * @param {Password} password
   * This method will check if the password is correct or not
   */
  // eslint-disable-next-line class-methods-use-this
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
  // eslint-disable-next-line class-methods-use-this
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
  // eslint-disable-next-line class-methods-use-this
  noSpecialChars(str) {
    const string = String(str);
    // eslint-disable-next-line no-useless-escape
    return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?_.()@]/g.test(string);
  }
}
