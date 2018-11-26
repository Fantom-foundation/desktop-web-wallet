export default class ValidationMethods {
  // eslint-disable-next-line class-methods-use-this
  isPasswordCorrect(password) {
    if (password) {
      // check it contains at least 1 number
      if (!/\d/.test(password)) {
        return false;
      }
      // check it contains at least 1 Capital letter
      if (password.toLowerCase() === password) {
        return false;
      }
      // check it has length of 8 characters
      if (password.length < 8) {
        return false;
      }
      return true;
    }
    return false;
  }
}
