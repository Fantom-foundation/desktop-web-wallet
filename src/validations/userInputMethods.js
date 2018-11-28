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
}
