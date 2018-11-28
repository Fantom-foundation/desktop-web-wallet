import React from 'react';
import { Row, Col } from 'reactstrap';
import IdenticonsIcon from './identicons-list';
import refreshIcon from '../../../images/icons/refresh-icon.svg';

/**
 * DisplayIdenticons  : This component is meant for rendering IdenticonsIcon list in create account screen of wallet setup.
 * animateRefreshIcon: if 'animateRefreshIcon' is true then 'refresh icon' is displayed with animation.
 */

export default class DisplayIdenticons extends React.PureComponent {
  render() {
    const { animateRefreshIcon, onRefresh, identiconsId, selectedIcon } = this.props;
    const items = [];
    let i = 0;
    if (selectedIcon) {
      items.push(
        <IdenticonsIcon
          selectedIcon={selectedIcon}
          accountIcon={selectedIcon || identiconsId}
          key={0}
          {...this.props}
          index={0}
        />
      );
      i = 1;
    }
    for (i; i < 6; i += 1) {
      const item = <IdenticonsIcon accountIcon={identiconsId} key={i} {...this.props} index={i} />;
      items.push(item);
    }

    return (
      <div className="avatar-selector">
        <Row>
          <Col>
            <ul className="identicon">{items}</ul>
          </Col>
          <Col className="identicon-refresh">
            <img
              aria-hidden
              src={refreshIcon}
              alt="Refresh"
              className={`${animateRefreshIcon && 'rotation anti-clock'}`}
              onClick={() => onRefresh()}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
