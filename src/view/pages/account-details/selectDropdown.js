import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import PropTypes from 'prop-types';
import withdrawImage from '../../../images/withdraw.svg';

export default class Select extends React.Component {
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
          <span className="ftm text-white">{maxFantomBalance} FTM</span>
        </DropdownToggle>
        <DropdownMenu>{accountDetailList}</DropdownMenu>
      </Dropdown>
    );
  }
}

Select.propTypes = {
  value: PropTypes.string.isRequired,
  maxFantomBalance: PropTypes.number.isRequired,
  accountDetailList: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
