import React, { FC } from 'react';
import { Row, Col } from 'reactstrap';
import _ from 'lodash';
import Identicon from '~/view/general/Identicon';
import refreshIcon from '~/images/icons/refresh-icon.svg';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { getURL } from '~/utility/dom';

interface IProps {
  date: number;
  selected: string;
  onSelect: (date: string) => void;
  onRefresh: () => void;
}

const CreateAccountIcons: FC<IProps> = ({ date, selected, onSelect, onRefresh }) => (
  <div className={styles.selector}>
    <Row>
      <Col className={styles.icons}>
        {_.range(0, 6).map(el => (
          <div key={el} onClick={() => onSelect(String(el) + String(date))}>
            <div className={styles.radio}>
              <div
                id={el}
                className={classNames(styles.check, {
                  [styles.checked]: selected === String(el) + String(date),
                })}
              />

              <Identicon id={String(el) + String(date)} width={40} key={el} size={3} />
            </div>
          </div>
        ))}
      </Col>

      <Col className={styles.refresh} md={4} lg={3}>
        <img aria-hidden src={getURL(refreshIcon)} alt="Refresh" onClick={onRefresh} />
      </Col>
    </Row>
  </div>
);

export { CreateAccountIcons };
