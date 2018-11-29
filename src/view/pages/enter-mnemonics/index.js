import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createAccount, incrementStepNo } from '../../../redux/accountInProgress/action';

class EnterMnemonics extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.onUpdate = this.onUpdate.bind(this);
  }

  /**
   * @param {Name of the key} key
   * @param {Value of the key} value
   * This method will update the value of the given key
   */
  onUpdate(key, value) {
    const SELF = this;
    this.setState(
      {
        [key]: value,
      },
      () => {
        SELF.disableNextButton();
      }
    );
    if (key === 'password' || key === 'reEnteredPassword') {
      this.isValidPassword(key, value);
    }
  }

  render() {
    return (
      <div id="account-information" className="account-information">
        fadsada
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accountName: state.accountInfo.accountName,
  password: state.accountInfo.password,
  passwordHint: state.accountInfo.passwordHint,
  selectedIcon: state.accountInfo.selectedIcon,
  stepNo: state.accountInfo.stepNo,
});

const mapDispatchToProps = dispatch => ({
  createNewAccount: data => {
    dispatch(() => createAccount(data));
  },
  goToNextStep: data => {
    dispatch(() => incrementStepNo(data));
  },
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(EnterMnemonics);
