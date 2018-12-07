import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { DropdownItem } from 'reactstrap';
import SelectDropDown from './selectDropdown';
import { getFantomBalance } from '../../../redux/getBalance/action';
/**
 * AccountList: This component is meant for rendering list of valid account in ' Withrom From ' type field in send funds screen.
 * User can select the account from which to transfer funds, selected account name is rendered in ' Withrom From ' field.
 */
class AccountList extends React.PureComponent {
  constructor(props) {
    super(props);
    const { getBalance, selectedAccount } = props;
    getBalance(selectedAccount.publicAddress);
  }

  renderAccountList() {
    const { accountList, setAccountType } = this.props;
    const accountDetailList = [];
    for (let account = 0; account < accountList.length; account += 1) {
      accountDetailList.push(
        <DropdownItem onClick={e => setAccountType(e, accountList[account])} key={account}>
          {accountList[account].accountName}
        </DropdownItem>
      );
    }
    return { accountDetailList };
  }

  render() {
    const SELF = this;
    const renderList = this.renderAccountList();
    const { maxFantomBalance, selectedAccount } = SELF.props;
    return (
      <React.Fragment>
        {/* <Input
          type="select"
          name="select"
          id="accountSelect"
          value={renderList.accountName}
          style={{
            backgroundImage: `url(${withdrawImage})`,
          }}
          onChange={this.setAccountType}
        >
          {renderList.accountDetailList}
        </Input> */}
        <SelectDropDown
          value={selectedAccount.accountName}
          publicAddress={selectedAccount.publicAddress}
          accountDetailList={renderList.accountDetailList}
          maxFantomBalance={maxFantomBalance}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  accountList: state.accounts.accountsList,
});

const mapDispatchToProps = dispatch => ({
  getBalance: data => dispatch(getFantomBalance(data)),
});

AccountList.propTypes = {
  accountList: PropTypes.oneOfType([PropTypes.object]).isRequired,
  selectedAccount: PropTypes.oneOfType([PropTypes.object]).isRequired,
  getBalance: PropTypes.func.isRequired,
  setAccountType: PropTypes.func.isRequired,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AccountList);
