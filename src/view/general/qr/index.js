import React from 'react';
import QRCode from 'qrcode.react';
import PropTypes from 'prop-types';
import FantomLogo from '../fantomLogo/index';

/**
 * QRCodeIcon: This component is meant for rendering QR code image for particuler address on screen,
 *  along with fantom logo.
 */
class QRCodeIcon extends React.PureComponent {
  /**
   * This method will return the Fantom logo
   */
  renderLogo() {
    const { address } = this.props;
    if (address !== undefined && address !== '') {
      return (
        <p
          style={{
            padding: '1px 5px',
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
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
    const { address } = this.props;
    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {this.renderLogo()}
        <QRCode bgColor="black" fgColor="white" value={`${address}`} level="H" size={158} />
      </div>
    );
  }
}

QRCodeIcon.propTypes = {
  address: PropTypes.func.isRequired,
};

export default QRCodeIcon;
