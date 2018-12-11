import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import PropTypes from 'prop-types';
import withdrawImage from '../../../../images/withdraw.svg';
import { getFantomBalance } from '../../../../redux/getBalance/action';
import ValidationMethods from '../../../../validations/userInputMethods';

const validationMethods = new ValidationMethods();

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  render() {
    const { value, accountDetailList, publicAddress, balance, gasPrice } = this.props;
    const { dropdownOpen } = this.state;
    const keys = Object.keys(balance);
    let valInEther = 0;
    if (balance && keys.length > 0 && balance[publicAddress]) {
      valInEther = validationMethods.getFormattedBalances(balance[publicAddress], gasPrice);
    }
    return (
      <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
        <DropdownToggle
          className="toggle-btn"
          style={{
            backgroundImage: `url(${withdrawImage})`,
          }}
        >
          {value}
          <span className="ftm text-white">
            {' '}
            {valInEther ? valInEther.maxFantomBalance : 0} FTM
          </span>
        </DropdownToggle>
        <DropdownMenu>{accountDetailList}</DropdownMenu>
      </Dropdown>
    );
  }
}

Select.propTypes = {
  value: PropTypes.string.isRequired,
  accountDetailList: PropTypes.oneOfType([PropTypes.array]).isRequired,
  publicAddress: PropTypes.string.isRequired,
  balance: PropTypes.oneOfType([PropTypes.object]).isRequired,
  gasPrice: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  balance: state.getBalance,
});

const mapDispatchToProps = dispatch => ({
  getBalance: data => dispatch(getFantomBalance(data)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Select);
