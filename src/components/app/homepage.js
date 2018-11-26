import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAccount, updateAccount } from '../../redux/account/action';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <p>Hello</p>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  todos: state,
});

const mapDispatchToProps = dispatch => ({
  createAccount: data => {
    dispatch(createAccount(data));
  },
  updateAccount: data => {
    dispatch(updateAccount(data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage);
