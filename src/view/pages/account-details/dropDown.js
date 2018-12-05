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

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  render() {
    return (
      <Dropdown toggle={this.toggle}>
        <DropdownToggle className="toggle-btn" caret>
          All
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>first</DropdownItem>
          <DropdownItem>second</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
