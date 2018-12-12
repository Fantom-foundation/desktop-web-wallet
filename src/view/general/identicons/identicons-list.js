import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from 'reactstrap';
import Identicons from './identicons';

/**
 * IdenticonsIcon :  This component is meant for rendering IdenticonsIcon list in create account screen of wallet setup.
 */

export default class IdenticonsIcon extends Component {
  /**
   * getRadioIconData() : Function to handle selected Identicon, from list of icons.
   * @param {string} identiconsId
   */
  getRadioIconData(identiconsId) {
    const { getRadioIconData } = this.props;
    if (getRadioIconData) {
      getRadioIconData(identiconsId);
    }
  }

  render() {
    const { index, date, selectedIcon } = this.props;
    const { accountIcon } = this.props;
    const iconIndex = index.toString();
    const currentDate = date.toString();
    let identiconsId = iconIndex + currentDate;
    if (selectedIcon && index === 0) {
      identiconsId = selectedIcon;
    }
    if (selectedIcon === identiconsId && index !== 0) {
      const nextIndex = (index + 5).toString();
      identiconsId = nextIndex + currentDate;
    }
    let checked = false;
    if (accountIcon && accountIcon === identiconsId) {
      checked = true;
    }
    return (
      <li>
        <FormGroup className="form-radio-label">
          <label htmlFor={index}>
            <div className="radio-holder">
              <input
                id={index}
                name="name"
                className="form-radio-field"
                type="radio"
                value={checked}
                defaultChecked={checked}
                onClick={() => this.getRadioIconData(identiconsId)}
              />
              <span />
            </div>
            <div className=" identicon-holder">
              <Identicons id={identiconsId} width={40} key={index} size={3} />
            </div>
          </label>
        </FormGroup>
      </li>
    );
  }
}

/**
 * Custom setting props to be passed for Header display changes:
 *
 * accountIcon: Selected account icon for wallet account.
 * index: Index of selected icon from list.
 * date:  Constant string for creating a Identicons.
 *
 */

IdenticonsIcon.propTypes = {
  getRadioIconData: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  date: PropTypes.number.isRequired,
  selectedIcon: PropTypes.string.isRequired,
  accountIcon: PropTypes.string.isRequired,
};
