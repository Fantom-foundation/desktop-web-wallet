import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ToastContainer, ToastStore } from 'react-toasts';
import { Container, Row, Col, Button } from 'reactstrap';
import copy from 'copy-to-clipboard';
import _ from 'lodash';
import Layout from '../../components/layout';
import Identicons from '../../general/identicons/identicons';

class AccountManagement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.addAccount = this.addAccount.bind(this);
  }

  /**
   * This method will return the accounts list
   */
  getAccountsList() {
    const { accountsList } = this.props;
    const accounts = [];
    if (accountsList && accountsList.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const account of accountsList) {
        if (account) {
          const index = _.findIndex(
            accountsList,
            accountInfo => accountInfo.accountName === account.accountName
          );
          accounts.push(
            <Col key={index} md={6} lg={3} className="main-col">
              <div className="accounts-holder">
                <div className="avatar">
                  <span className="avatar-icon">
                    <Identicons id={account.selectedIcon} width={40} key={0} size={3} />
                  </span>
                </div>
                <h2 className="title ">
                  <span>{account.accountName}</span>
                </h2>
                <div className="account-no">
                  <p>
                    <span>
                      <button
                        type="button"
                        className="clipboard-btn"
                        onClick={() => this.copyToClipboard(index)}
                      >
                        <i className="fas fa-clone" />
                      </button>
                    </span>
                    {account.publicAddress}
                  </p>
                </div>
              </div>
            </Col>
          );
        }
      }
    }

    return accounts;
  }

  /**
   * This method will redirect user to the create account screen
   */
  addAccount() {
    const { history } = this.props;
    history.push('/create-account');
  }

  /**
   * This method will copy the text
   */
  copyToClipboard(index) {
    const { accountsList } = this.props;
    copy(accountsList[index].publicAddress);
    ToastStore.info('Copy to clipboard', 800);
  }

  render() {
    const accountList = this.getAccountsList();
    return (
      <div id="account-management" className="account-management">
        <Layout>
          <section className="page-title">
            <Container>
              <Row>
                <Col>
                  <h2 className="title text-white text-center text-uppercase m-0">
                    <span>Account Management</span>
                  </h2>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="bg-dark" style={{ padding: '0 0 120px' }}>
            <Container className="account-card-container">
              <Row style={{ marginBottom: '90px' }}>
                <Col>
                  <div className="add-wallet">
                    <h2 className="title ">
                      <span>Accounts</span>
                    </h2>
                    <Button onClick={this.addAccount}>
                      <i className="fas fa-plus" />
                    </Button>
                  </div>
                </Col>
              </Row>
              <Row id="account-card" className="text-center ">
                {accountList}
              </Row>
            </Container>
            <ToastContainer position={ToastContainer.POSITION.TOP_CENTER} store={ToastStore} />
          </section>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accountsList: state.accounts.accountsList,
});

AccountManagement.propTypes = {
  accountsList: PropTypes.oneOfType([PropTypes.array]).isRequired,
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default compose(
  connect(mapStateToProps),
  withRouter
)(AccountManagement);
