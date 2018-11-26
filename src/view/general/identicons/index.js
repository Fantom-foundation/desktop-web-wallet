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
    const { animateRefreshIcon, onRefresh, identiconsId } = this.props;
    const items = [];
    for (let i = 0; i < 6; i += 1) {
      const item = <IdenticonsIcon accountIcon={identiconsId} key={i} {...this.props} index={i} />;
      items.push(item);
    }

    return (
      <Row className="m-auto" style={{ maxWidth: '635px' }}>
        <Col>
          <ul className="identicon m-0 p-0">{items}</ul>
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
    );
  }
}
