import React from 'react';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';

/**
 * Loader :  This component is meant for rendering loader on screen.
 *
 * sizeUnit: To set units of size of loader,
 * size: To set size of loader,
 * color: To set color of loader,
 * loading: To set loading is enable or disableed.
 */
class Loader extends React.PureComponent {
  render() {
    const { sizeUnit, size, color, loading } = this.props;
    return <ClipLoader sizeUnit={sizeUnit} size={size} color={color} loading={loading} />;
  }
}

Loader.propTypes = {
  sizeUnit: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Loader;
