import React, { FC } from 'react';
import { Row, Col } from 'reactstrap';
import QRCodeIcon from '~/view/general/QRCodeIcon/index';
import BrandLogo from '~/images/logo/FantomWallet.svg';
import styles from './styles.module.scss';

interface IProps {
  mnemonic: string;
  address: string;
}

const AccountDetailPrint: FC<IProps> = ({ mnemonic, address }) => (
  <div className={styles.print}>
    <Row>
      <Col className="info">
        <h2>Your Address</h2>
        <p>{address}</p>
        <h2>Mnemonic Phrase</h2>
        <p className="mnemonic">{mnemonic}</p>
        <div className="qr">
          <QRCodeIcon address={address} bgColor="white" fgColor="black" />
        </div>
      </Col>
      
      <Col className="brand">
        <div className="brand-holder">
          <img src={BrandLogo} alt="logo" />
          <p>https://fantom.foundation/</p>
        </div>
      </Col>
    </Row>
  </div>
);

export default AccountDetailPrint;
