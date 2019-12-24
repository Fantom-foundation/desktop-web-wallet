/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
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
// import QrImage from 'src/images/qr/Qr.png';

export default ({ account }) => {
  debugger
  const [amount, setAmount] = useState(false);
  const [copy, setCopy] = useState(false);
  const [download, setDownload] = useState(false);
  return (
    <div>
      <h3 className="mb-3 pb-1 opacity-5 font-weight-semi-bold">Balance</h3>
      <h2 className="mb-5">
$
        {account.balance}
        {' '}
FTM
      </h2>

      <Card>
        <h2 className="mb-5 font-weight-extra-bold">Receive FTM</h2>
        <div className={classname(styles.qrWrapper, 'text-center')}>
          <QRCodeIcon
            address={account.publicAddress}
            bgColor="white"
            fgColor="black"
          />
          {/* <img src={QrImage} alt="" /> */}
        </div>
        <div className={styles.btnWrapper}>
          <button
            type="button"
            className={classname(styles.optionBtn, 'btn-icon')}
            onClick={() => setAmount(!amount)}
          >
            {amount ? <SetAmountCircleSolidIcon /> : <SetAmountCircleIcon />}
            Set amount
          </button>
          <button
            type="button"
            className={classname(styles.optionBtn, 'btn-icon')}
            onClick={() => setCopy(!copy)}
          >
            {copy ? <CopyCircleSolidIcon /> : <CopyCircleIcon />}
            Copy
          </button>
          <button
            type="button"
            className={classname(styles.optionBtn, 'btn-icon')}
            onClick={() => setDownload(!download)}
          >
            {download ? <DownloadCircleSolidIcon /> : <DownloadCircleIcon />}
            Download
          </button>
        </div>
        {amount && (
          <div className={styles.amountInput}>
            <Input placeholder="Enter amount" />
            <button type="button">
              <i className="fas fa-check" />
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};
