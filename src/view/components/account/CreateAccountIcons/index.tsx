import React, { FC } from 'react';
import { FormGroup, Row, Col } from 'reactstrap';
import _ from 'lodash';
import Identicons from '~/view/general/identicons/identicons';
import refreshIcon from '~/images/icons/refresh-icon.svg';

interface IProps {
  date: number;
  selected: string;
  onSelect: (date: string) => void;
  onRefresh: () => void;
}

const CreateAccountIcons: FC<IProps> = ({ date, selected, onSelect, onRefresh }) => (
  <div className="avatar-selector">
    <Row>
      <Col>
        <ul className="identicon">
          {_.range(0, 5).map(el => (
            <li key={el}>
              <FormGroup className="form-radio-label">
                <label htmlFor={el}>
                  <div className="radio-holder">
                    <input
                      id={el}
                      name="name"
                      className="form-radio-field"
                      type="radio"
                      checked={selected === String(el) + String(date)}
                      onChange={() => onSelect(String(el) + String(date))}
                      readOnly
                    />

                    <span />
                  </div>

                  <div className=" identicon-holder">
                    <Identicons id={String(el) + String(date)} width={40} key={el} size={3} />
                  </div>
                </label>
              </FormGroup>
            </li>
          ))}
        </ul>
      </Col>

      <Col className="identicon-refresh">
        <img
          aria-hidden
          src={refreshIcon}
          alt="Refresh"
          onClick={onRefresh}
        />
      </Col>
    </Row>
  </div>
);

export { CreateAccountIcons };
