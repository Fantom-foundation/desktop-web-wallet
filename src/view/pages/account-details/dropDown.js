import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { ALL_TX, SENT_TX, RECEIVED_TX } from '../../../redux/constants';

export default class DropDown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.filterTransaction = this.filterTransaction.bind(this);
    const { txType } = this.props || 'All';
    this.state = {
      dropdownOpen: false,
      txType,
    };
  }

  /**
   * This method will toggle the dropdown
   */
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  /**
   * Filter to display transaction list.
   */
  filterTransaction(txType) {
    const { filterTransaction } = this.props;
    if (filterTransaction) {
      filterTransaction(txType);
      this.setState({
        txType,
      });
    }
  }

  render() {
    const { dropdownOpen, txType } = this.state;
    return (
      <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
        <DropdownToggle className="toggle-btn" caret>
          {txType}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => this.filterTransaction(ALL_TX)}>{ALL_TX}</DropdownItem>
          <DropdownItem onClick={() => this.filterTransaction(SENT_TX)}>{SENT_TX}</DropdownItem>
          <DropdownItem onClick={() => this.filterTransaction(RECEIVED_TX)}>
            {RECEIVED_TX}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

DropDown.propTypes = {
  filterTransaction: PropTypes.func.isRequired,
};
