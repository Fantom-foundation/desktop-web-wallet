import React from 'react';
import QRCode from 'qrcode.react';
import styles from './styles.module.scss';

interface IProps  {
  bgColor?: string;
  fgColor?: string;
  address: string;
  text?: string;
  id?: string;
};

class QRCodeIcon extends React.PureComponent<IProps> {
  
  render() {
    const { address, bgColor, fgColor, id } = this.props;
    return (
      <div className={styles.qrWrapper}>
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
