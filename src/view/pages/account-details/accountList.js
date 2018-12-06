import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { DropdownItem } from 'reactstrap';
import SelectDropDown from './selectDropdown';
/**
 * AccountList: This component is meant for rendering list of valid account in ' Withrom From ' type field in send funds screen.
 * User can select the account from which to transfer funds, selected account name is rendered in ' Withrom From ' field.
 */
class AccountList extends React.PureComponent {
  constructor(props) {
    super(props);
    const { accountList } = props;
    this.state = {
      accountType: accountList[0].accountName,
    };
    this.setAccountType = this.setAccountType.bind(this);
  }

  setAccountType = e => {
    this.setState({
      accountType: e.target.innerText,
    });
  };

  renderAccountList() {
    const { accountList } = this.props;
    const accountDetailList = [];
    for (let account = 0; account < accountList.length; account += 1) {
      accountDetailList.push(
        <DropdownItem onClick={this.setAccountType} key={account}>
          {accountList[account].accountName}
        </DropdownItem>
      );
    }
    return { accountDetailList };
  }

  render() {
    const SELF = this;
    const renderList = this.renderAccountList();
    const { accountType } = this.state;
    const { maxFantomBalance } = SELF.props;
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
          value={accountType}
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

AccountList.propTypes = {
  accountList: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default compose(connect(mapStateToProps))(AccountList);
