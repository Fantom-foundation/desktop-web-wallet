import React, { useState, useCallback } from 'react';
import { Card, Collapse } from 'reactstrap';
import styles from './styles.module.scss';
import activityMockData from './activityMockData';
import { SendIcon, ReceiveIcon, CopyIcon } from 'src/view/components/svgIcons';
import { Link } from 'react-router-dom';
import { any } from 'prop-types';
import { copyToClipboard } from '~/utility/clipboard';

const SubView = (props: any) => {
  const { hash = false, title, value } = props;
  const onClick = useCallback(event => copyToClipboard(event, value), [value]);

  return (
    <div className={styles.subView}>
      <p className={styles.subViewTitle}>{title}</p>
      <p className={styles.subViewValue}>
        {hash ? (
          <>
            <Link to="/">{value}</Link>
            <button onClick={onClick}>
              <CopyIcon />
            </button>
          </>
        ) : (
          value
        )}
      </p>
    </div>
  );
};
const Activities = (props: any) => {
  const { status, time, ftm, subView = [] } = props,
    [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.activities}>
      <div className={styles.activitiesRow} onClick={() => setIsOpen(!isOpen)}>
        <p className={styles.status}>
          {status === 'Sent' ? <SendIcon /> : <ReceiveIcon />}
          {status}
        </p>
        <div
          className={`d-flex justify-content-between w-100 ${styles.timeFtmWrapper}`}
        >
          <p className={styles.time}>{time}</p>
          <p className={styles.ftm}>{ftm}</p>
        </div>
      </div>
      <Collapse isOpen={isOpen}>
        {subView.map((data: object, index: number) => (
          <SubView key={index} {...data} />
        ))}
      </Collapse>
    </div>
  );
};
export default () => (
  <Card>
    <p className="card-label">Activity</p>
    <div>
      {activityMockData.map((data: object, index: number) => (
        <Activities key={index} {...data} />
      ))}
    </div>
  </Card>
);
