import React from 'react';
import { Row, Col } from 'reactstrap';
import IdenticonsIcon from '~/view/general/identicons/IdenticonsIcon';
import refreshIcon from '~/images/icons/refresh-icon.svg';
import range from 'lodash/range';

type Props = {
  date: number;
  animateRefreshIcon: boolean;
  identiconsId: string;
  onRefresh: () => void;
  selectedIcon: string;
  getRadioIconData: (value: string) => void;
};

/**
 * DisplayIdenticons  : This component is meant for rendering IdenticonsIcon list in create account screen of wallet setup.
 * animateRefreshIcon: if 'animateRefreshIcon' is true then 'refresh icon' is displayed with animation.
 */

export default class DisplayIdenticons extends React.PureComponent<Props> {
  render() {
    const {
      animateRefreshIcon,
      onRefresh,
      identiconsId,
      selectedIcon,
      date,
      getRadioIconData,
    } = this.props;

    return (
      <div className="avatar-selector">
        <Row>
          <Col>
            <ul className="identicon">
              {selectedIcon && (
                <IdenticonsIcon
                  selectedIcon={selectedIcon}
                  accountIcon={selectedIcon || identiconsId}
                  date={date}
                  index={0}
                  getRadioIconData={getRadioIconData}
                />
              )}
              {range(0, selectedIcon ? 5 : 6).map(el => (
                <IdenticonsIcon
                  accountIcon={identiconsId}
                  key={el}
                  selectedIcon={selectedIcon}
                  date={date}
                  getRadioIconData={getRadioIconData}
                  index={el}
                />
              ))}
            </ul>
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
