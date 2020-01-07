/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback } from 'react';
import { Card, Collapse } from 'reactstrap';
import styles from './styles.module.scss';
import activityMockData from './activityMockData';
import { SendIcon, ReceiveIcon, CopyIcon } from 'src/view/components/svgIcons';
import { Link } from 'react-router-dom';
import { any } from 'prop-types';
import { copyToClipboard } from '~/utility/clipboard';
import { mockComponent } from 'react-dom/test-utils';
import Web3 from 'web3';
import moment from 'moment';

const FANTOM_WEB_URL = 'https://explorer.fantom.network'

const SubView = (props: any) => {
  const { value, to, fee, newDate, memo } = props;
  // const { hash = false, title, value } = props;
  const onClickTo = useCallback(event => copyToClipboard(event, to), [to]);
  const onClickHash = useCallback(event => copyToClipboard(event, value), [
    value,
  ]);

  return (
    <>
      <div className={styles.subView}>
        <p className={styles.subViewTitle}>Recipient</p>
        <p className={styles.subViewValue}>
          <a target="_blank" href={`${FANTOM_WEB_URL}/address/${to}`}>
            {to}
          </a>
          <button onClick={onClickTo}>
            <CopyIcon />
          </button>
        </p>
      </div>
      <div className={styles.subView}>
        <p className={styles.subViewTitle}>Transaction hash:</p>
        <p className={styles.subViewValue}>
          <a target="_blank" href={`${FANTOM_WEB_URL}/transactions/${value}`}>
            {value}
          </a>
          <button onClick={onClickHash}>
            <CopyIcon />
          </button>
        </p>
      </div>
      <div className={styles.subView}>
        <p className={styles.subViewTitle}>Date</p>
        <p className={styles.subViewValue}>{newDate}</p>
      </div>
      <div className={styles.subView}>
        <p className={styles.subViewTitle}>Fee</p>
        <p className={styles.subViewValue}>
          {fee && parseFloat(Web3.utils.fromWei(fee.toString())).toFixed(5)} FTM
        </p>
      </div>
      {memo !== '' && memo !== undefined && <div className={styles.subView}>
        <p className={styles.subViewTitle}>Memo</p>
        <p className={styles.subViewValue}>
          {memo}
        </p>
      </div>}
    </>
  );
};

const Activities = (props: any) => {
  const newTime = new Date(props.data.timestamp * 1000);
  const { time, ftm, subView = [] } = props;
  const [isOpen, setIsOpen] = useState(false);
  const newDate = moment(newTime).format('MMM DD, hh:mm a');
  const isRecieve = props.data.from === props.address.toLowerCase();
  return (
    <div className={styles.activities}>
      <div className={styles.activitiesRow} onClick={() => setIsOpen(!isOpen)}>
        <p className={styles.status}>
          {isRecieve ? <SendIcon /> : <ReceiveIcon />}
          {isRecieve ? 'Sent' : 'Recieve'}
        </p>
        <div
          className={`d-flex justify-content-between w-100 ${styles.timeFtmWrapper}`}
        >
          <p className={styles.time}>{newDate}</p>
          <p className={styles.ftm}>
            {' '}
            {isRecieve ? '-' : '+'}
            {props.data.value &&
              parseFloat(Web3.utils.fromWei(props.data.value)).toFixed(5)}{' '}
            FTM
          </p>
        </div>
      </div>
      <Collapse isOpen={isOpen}>
        <SubView
          memo={props.memo}
          to={props.data.to}
          fee={props.data.fee}
          newDate={newDate}
          value={props.data.hash}
        />
      </Collapse>
    </div>
  );
};
export default props => {
  const {transactionHashDetails} = props
  return (
    <Card className={styles.card}>
      <p className="card-label">Activity</p>
      <div>
        {/* {activityMockData.map((data: object, index: number) => (
        <Activities key={index} {...data} />
      ))} */}
        {props &&
          props.transactions &&
          props.transactions.length > 0 &&
          props.transactions.map((data: any, index: number) => {
            console.log('*****dsadas', data)
            let memo = ''
            if(!!transactionHashDetails && transactionHashDetails[data.hash] !== ''){
                memo = transactionHashDetails[data.hash]
            }
            return <Activities key={index} memo={memo} data={data} address={props.address} />
})}
      </div>
    </Card>
  );
};
