import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ToastContainer, ToastStore } from 'react-toasts';
import { Container, Row, Col, Button } from 'reactstrap';
import _ from 'lodash';
import copyToClipboard from '../../../utility';
import Layout from '../../components/layout';
import Identicons from '../../general/identicons/identicons';
import ShowPublicAddress from '../../components/public-address';

class AccountManagement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.goToAccountDetail = this.goToAccountDetail.bind(this);
    this.addAccount = this.addAccount.bind(this);
  }

  /**
   * This method will return the accounts list
   */
  getAccountsList() {
    const { accountsList } = this.props;
    const accounts = [];
    if (accountsList && accountsList.length > 0) {
      for (let i = 0; i < accountsList.length; i += 1) {
        const account = accountsList[i];
        if (account) {
          const index = _.findIndex(
            accountsList,
            accountInfo => accountInfo.accountName === account.accountName
          );
          accounts.push(
            <Col
              key={index}
              md={6}
              lg={3}
              className="main-col"
              onClick={() => this.goToAccountDetail(index)}
            >
              <div className="accounts-holder">
                <div className="avatar">
                  <span className="avatar-icon">
                    <Identicons id={account.selectedIcon} width={40} key={0} size={3} />
                  </span>
                </div>
                <h2 className="title ">
                  <span>{account.accountName}</span>
                </h2>
                <ShowPublicAddress
                  copyToClipboard={copyToClipboard}
                  publicAddress={account.publicAddress}
                />
              </div>
            </Col>
          );
        }
      }
    }

    return accounts;
  }

  /**
   * @param {Selected Account Index} index
   * This method will redirect user to the details of the selected account
   */
  goToAccountDetail(index) {
    const SELF = this;
    const { history } = SELF.props;
    history.push('/account-details', { selectedAccountIndex: index });
  }

  /**
   * This method will redirect user to the create account screen
   */
  addAccount() {
    const { history } = this.props;
    history.push('/create-account');
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
