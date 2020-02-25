/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useEffect } from 'react';
import { Card, Input } from 'reactstrap';
import { SendForm } from '../../../components/forms';
import classname from 'classnames';
import { convertFTMValue } from '~/view/general/utilities';
import {
  CopyCircleIcon,
  CopyCircleSolidIcon,
  SetAmountCircleIcon,
  SetAmountCircleSolidIcon,
  DownloadCircleIcon,
  DownloadCircleSolidIcon,
  CopyIcon,
  CheckCircleIcon,
  ErrorCircleIcon,
} from 'src/view/components/svgIcons';
import styles from './styles.module.scss';
import QRCodeIcon from '~/view/general/QRCodeIcon/index';
import { copyToClipboard } from '~/utility/clipboard';
import { useTranslation } from "react-i18next";
import { RouteComponentProps } from 'react-router';

import { IAccount } from '~/redux/account/types';
import { connect } from 'react-redux';
import { selectAccount } from '~/redux/account/selectors';

import * as ACCOUNT_ACTIONS from '~/redux/account/actions';

const downloadQR = address => {
  const canvas = document.getElementById(address) as HTMLCanvasElement;
  const pngUrl = canvas
    .toDataURL(`qrcode${address}/png`)
    .replace('qrcode/png', 'qrcode/octet-stream');

  const downloadLink = document.createElement('a');
  downloadLink.href = pngUrl;
  downloadLink.download = `qrcode${address}/png`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

const mapStateToProps = state => ({
  accountData: selectAccount(state),
});

const mapDispatchToProps = {
  accountGetBalance: ACCOUNT_ACTIONS.accountGetBalance,
};

type IProps = ReturnType<typeof mapStateToProps> &
  RouteComponentProps<{ id: string }> &
  typeof mapDispatchToProps & {
    account: IAccount;
    list: {};
    id: string;
  };

const RecieveDetails = ({
  match: {
    params: { id },
  },
  accountData,
  accountGetBalance,
}) => {
  const { t } = useTranslation();

  const [amount, setAmount] = useState(false);
  const account = accountData.list && id && accountData.list[id];

  const [receiveValue, setReceiveAmount] = useState('');
  const [copy, setCopy] = useState(false);
  const [download, setDownload] = useState(false);
  const text = "copiedClipboard"

  const onCopyClick = useCallback(
    event => copyToClipboard(event, account.publicAddress, text, t),
    [account.publicAddress, t]
  );
  useEffect(() => {
    const interval = setInterval(() => {
      accountGetBalance(account.publicAddress);
    }, 2000);
    return () => clearInterval(interval);
  }, [accountGetBalance, account.publicAddress]);

  return (
    <div>
      <div className={styles.headWrapper}>
        <h3 className="mb-3 pb-1 opacity-5 font-weight-semi-bold">{t("balance")}</h3>
        <h2 className="mb-md-5">
          {convertFTMValue(parseFloat(account&&account.balance ? account.balance : '0'))}
          {' '}
FTM
        </h2>
      </div>
      <Card>
        <h2 className={classname(styles.cardTitle, 'font-weight-extra-bold')}>
          {t("receiveFTM")}
        </h2>
        <div className={classname(styles.qrWrapper, 'text-center')}>
          <QRCodeIcon
            address={account.publicAddress}
            bgColor="white"
            fgColor="black"
            id={account.publicAddress}
          />

          {/* <img src={QrImage} alt="" /> */}
        </div>
        <div className={styles.btnWrapper}>
          {/* <button
            type="button"
            className={classname(styles.optionBtn, 'btn-icon')}
            onClick={() => {
              setAmount(!amount);
              setReceiveAmount('');
            }}
          >
            {amount ? <SetAmountCircleSolidIcon /> : <SetAmountCircleIcon />}
            Set amount
          </button> */}
          <button
            type="button"
            className={classname(styles.optionBtn, 'btn-icon')}
            onClick={e => {
              setCopy(!copy);
              onCopyClick(e);
            }}
          >
            {copy ? <CopyCircleSolidIcon /> : <CopyCircleIcon />}
            {t("copy")}
          </button>

          <button
            type="button"
            className={classname(styles.optionBtn, 'btn-icon')}
            onClick={() => {
              setDownload(!download);
              downloadQR(account.publicAddress);
            }}
          >
            {download ? <DownloadCircleSolidIcon /> : <DownloadCircleIcon />}
            {t("download")}
          </button>
        </div>
        {/* {amount && (
          <div className={styles.amountInput}>
            <Input
              type="text"
              placeholder="Enter amount"
              value={receiveValue}
              onChange={e => {
                const re = /^[0-9\b]+$/;
                if (e.target.value === '' || re.test(e.target.value)) {
                  setReceiveAmount(e.target.value);
                }
              }}
              min="0"
            />
            <button type="button">
              <i className="fas fa-check" />
            </button>
          </div>
        )} */}
      </Card>
    </div>
  );
};

const RecieveDetailsData = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecieveDetails);

export default RecieveDetailsData;
