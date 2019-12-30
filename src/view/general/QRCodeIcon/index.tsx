import React from 'react';
import QRCode from 'qrcode.react';
import styles from './styles.module.scss';

// import FantomLogo from '~/view/general/FantomLogo/';
import fantomLogo from 'src/images/logo/fantom-logo-white.svg';
type IProps = {
  bgColor?: string;
  fgColor?: string;
  address: string;
  text?: string;
  id?: string;
};

class QRCodeIcon extends React.PureComponent<IProps> {
  renderLogo() {
    const { address } = this.props;

    if (address !== undefined && address !== '') {
      return (
        <p
          className="m-0"
          style={{
            padding: '1px 4px',
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <img src={fantomLogo} style={{ height: 22 }} alt="Fantom" />
        </p>
      );
    }
    return null;
  }

  render() {
    const { address, bgColor, fgColor, id } = this.props;
    return (
      <div className={styles.qrWrapper}>
        {this.renderLogo()}
        <QRCode
          bgColor={bgColor}
          fgColor={fgColor}
          value={`${address}`}
          renderAs="canvas"
          level="H"
          size={240}
          id={`${id}`}
        />
      </div>
    );
  }
}

export default QRCodeIcon;
