import React from 'react';
import QRCode from 'qrcode.react';
import FantomLogo from '~/view/general/FantomLogo/';

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
          style={{
            padding: '1px 5px',
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '128px',
          }}
        >
          <FantomLogo logoType={2} />
        </p>
      );
    }
    return null;
  }

  render() {
    const { address, bgColor, fgColor, id } = this.props;
    return (
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          border: '6px solid #fff',
        }}
      >
        {this.renderLogo()}
        <QRCode
          bgColor={bgColor}
          fgColor={fgColor}
          value={`${address}`}
          renderAs="canvas"
          level="H"
          size={158}
          id={`${id}`}
        />
      </div>
    );
  }
}

export default QRCodeIcon;
