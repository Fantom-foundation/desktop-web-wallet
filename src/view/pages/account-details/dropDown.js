import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class DropDown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
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

  render() {
    const SELF = this;
    const { dropdownOpen } = this.state;
    const { sortTransactions } = SELF.props;
    return (
      <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
        <DropdownToggle className="toggle-btn" caret>
          All
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => sortTransactions('sent')}>Sent</DropdownItem>
          <DropdownItem onClick={() => sortTransactions('received')}>Received</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
