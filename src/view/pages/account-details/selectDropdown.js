import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import PropTypes from 'prop-types';
import withdrawImage from '../../../images/withdraw.svg';
import { getFantomBalance } from '../../../redux/getBalance/action';

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
    const { value, maxFantomBalance, accountDetailList } = this.props;
    const { dropdownOpen } = this.state;
    return (
      <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
        <DropdownToggle
          className="toggle-btn"
          style={{
            backgroundImage: `url(${withdrawImage})`,
          }}
        >
          {value}
          <span className="ftm text-white"> {maxFantomBalance} FTM</span>
        </DropdownToggle>
        <DropdownMenu>{accountDetailList}</DropdownMenu>
      </Dropdown>
    );
  }
}

Select.propTypes = {
  value: PropTypes.number.isRequired,
  maxFantomBalance: PropTypes.number.isRequired,
  accountDetailList: PropTypes.number.isRequired,
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
