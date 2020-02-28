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
import i18n from "i18next";
import activityMockData from './activityMockData';
import { SendIcon, ReceiveIcon, CopyIcon } from 'src/view/components/svgIcons';
import { Link } from 'react-router-dom';
import { any } from 'prop-types';
import { copyToClipboard } from '~/utility/clipboard';
import { mockComponent } from 'react-dom/test-utils';
import Web3 from 'web3';
import moment from 'moment';
import { useTranslation } from "react-i18next";

const FANTOM_WEB_URL = 'https://explorer.fantom.network'

const SubView = (props: any) => {
  const { value, to, fee, newDate, memo, t} = props;
  const text = "copiedClipboard"

  // const { hash = false, title, value } = props;
  const onClickTo = useCallback(event => copyToClipboard(event, to, text, t), [t, to]);
  const onClickHash = useCallback(event => copyToClipboard(event, value, text, t), [t, value]);

  return (
    <>
      <div className={styles.subView}>
        <p className={styles.subViewTitle}>{t("Recipient")}</p>
        <p className={styles.subViewValue}>
          <a target="_blank" rel="noopener noreferrer" href={`${FANTOM_WEB_URL}/address/${to}`}>
            {to}
          </a>
          <button type="submit" onClick={onClickTo}>
            <CopyIcon />
          </button>
        </p>
      </div>
      <div className={styles.subView}>
        <p className={styles.subViewTitle}>{t("transactionHash")}:</p>
        <p className={styles.subViewValue}>
          <a
            target="_blank"
            rel="noopener noreferrer" 
            href={`${FANTOM_WEB_URL}/transactions/${value}`}
          >
            {value}
          </a>
          <button type="submit" onClick={onClickHash}>
            <CopyIcon />
          </button>
        </p>
      </div>
      <div className={styles.subView}>
        <p className={styles.subViewTitle}>{t("date")}</p>
        <p className={styles.subViewValue}>{newDate}</p>
      </div>
      <div className={styles.subView}>
        <p className={styles.subViewTitle}>{t("fee")}</p>
        <p className={styles.subViewValue}>
          {fee && parseFloat(Web3.utils.fromWei(fee.toString())).toFixed(5)} FTM
        </p>
      </div>
      {memo !== '' && memo !== undefined && <div className={styles.subView}>
        <p className={styles.subViewTitle}>{t("memo")}</p>
        <p className={styles.subViewValue}>
          {memo}
        </p>
                                            </div>}
    </>
  );
};

 const formatActivities = (activityDate, trans) => {
  const t = new Date(activityDate * 1000);
  const month = moment(t).format("MMM");
  const date = moment(t).format("DD");
  const d = date[0] === "0" ? date[1] : date;
  const time = moment(t).format("hh:mm A");
  const year = moment(t).format("YYYY");
  const {language} = i18n;
  const dateString = `${trans(month)} ${d}${trans("th")}, ${year} ${time}`;
  if (language === "chi")
    return `${year}年 ${trans(month)} ${d}${trans("th")},  ${time}`;
 return dateString;
};

const Activities = (props: any) => {
  const newTime = new Date(props.data.timestamp * 1000);
  const { time, ftm, subView = [], t } = props;
  const [isOpen, setIsOpen] = useState(false);
  const newDate = formatActivities(props.data.timestamp , t);
  const isRecieve = props.data.from === props.address.toLowerCase();
  return (
    <div className={styles.activities}>
      <div className={styles.activitiesRow} onClick={() => setIsOpen(!isOpen)}>
        <p className={styles.status}>
          {isRecieve ? <SendIcon /> : <ReceiveIcon />}
          {isRecieve ? t("sent") : t("receive")}
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
          t={t}
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
  const { t } = useTranslation();

  return (
    <Card className={styles.card}>
      <p className="card-label">{t("recentActivity")}</p>
      <div>
        
        {props &&
          props.transactions &&
          props.transactions.length > 0 &&
          props.transactions.map((data: any, index: number) => {
            let memo = ''
            if(!!transactionHashDetails && transactionHashDetails[data.hash] !== ''){
                memo = transactionHashDetails[data.hash]
            }
            return <Activities t={t} key={index} memo={memo} data={data} address={props.address} />
})}
      </div>
    </Card>
  );
};
