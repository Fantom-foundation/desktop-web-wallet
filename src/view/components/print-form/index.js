import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import QRCodeIcon from '../../general/qr/index';
import BrandLogo from '../../../images/logo/FantomWallet.svg';

// To render screen for printout of account-info.
class AccountDetailPrint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressTitle: 'Your Address',
    };
  }

  render() {
    const { mnemonic, address } = this.props;
    const { addressTitle } = this.state;
    return (
      <div id="print-screen">
        <Row>
          <Col className="info">
            <h2>{addressTitle}</h2>
            <p>{address}</p>
            <h2>Mnemonic Phrase</h2>
            <p className="mnemonic">{mnemonic}</p>
            <div className="qr">
              <QRCodeIcon
                address={address}
                text="FANTOM"
                bgColor="white"
                fgColor="black"
                level="H"
                size={158}
              />
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
  }
}

export default AccountDetailPrint;
