/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback } from 'react';
import { Card, Input } from 'reactstrap';
import { SendForm } from '../../../components/forms';
import classname from 'classnames';
import {
  CopyCircleIcon,
  CopyCircleSolidIcon,
  SetAmountCircleIcon,
  SetAmountCircleSolidIcon,
  DownloadCircleIcon,
  DownloadCircleSolidIcon,
} from 'src/view/components/svgIcons';
import styles from './styles.module.scss';
import QRCodeIcon from '~/view/general/QRCodeIcon/index';
import { copyToClipboard } from '~/utility/clipboard';

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
export default ({ account }) => {
  const [amount, setAmount] = useState(false);
  const [receiveValue, setReceiveAmount] = useState('');
  const [copy, setCopy] = useState(false);
  const [download, setDownload] = useState(false);
  const onCopyClick = useCallback(
    event => copyToClipboard(event, account.publicAddress),
    [account.publicAddress]
  );

  return (
    <div>
      <h3 className="mb-3 pb-1 opacity-5 font-weight-semi-bold">Balance</h3>
      <h2 className="mb-5">${account.balance} FTM</h2>

      <Card>
        <h2 className="mb-5 font-weight-extra-bold">Receive FTM</h2>
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
          <button
            type="button"
            className={classname(styles.optionBtn, 'btn-icon')}
            onClick={() => {
              setAmount(!amount);
              setReceiveAmount('');
            }}
          >
            {amount ? <SetAmountCircleSolidIcon /> : <SetAmountCircleIcon />}
            Set amount
          </button>
          <button
            type="button"
            className={classname(styles.optionBtn, 'btn-icon')}
            onClick={e => {
              setCopy(!copy);
              onCopyClick(e);
            }}
          >
            {copy ? <CopyCircleSolidIcon /> : <CopyCircleIcon />}
            Copy
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
            Download
          </button>
        </div>
        {amount && (
          <div className={styles.amountInput}>
            <Input
              type="number"
              placeholder="Enter amount"
              value={receiveValue}
              onChange={e => setReceiveAmount(e.target.value)}
              min="0"
            />
            <button type="button">
              <i className="fas fa-check" />
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};
