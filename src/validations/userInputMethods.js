export default class ValidationMethods {
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

  // eslint-disable-next-line class-methods-use-this
  noSpecialChars(str) {
    // eslint-disable-next-line no-param-reassign
    str = String(str);
    // eslint-disable-next-line no-useless-escape
    return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?_.()@]/g.test(str);
  }
}
