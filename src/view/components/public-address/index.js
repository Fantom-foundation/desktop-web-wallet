import React from 'react';
import PropTypes from 'prop-types';

export default class ShowPublicAddress extends React.PureComponent {
  render() {
    const { copyToClipboard, publicAddress } = this.props;
    return (
      <div className="account-no">
        <p>
          <span>
            <button
              type="button"
              className="clipboard-btn"
              onClick={e => copyToClipboard(e, publicAddress)}
            >
              <i className="fas fa-clone" />
            </button>
          </span>
          {publicAddress}
        </p>
      </div>
    );
  }
}
ShowPublicAddress.propTypes = {
  publicAddress: PropTypes.string.isRequired,
  copyToClipboard: PropTypes.func.isRequired,
};
