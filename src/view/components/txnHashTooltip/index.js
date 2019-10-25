import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';

/**
 * TxHashTooltip : To display tooltip with Transaction hash for copying Transaction hash.
 */
export default class TxHashTooltip extends Component {
  constructor(props) {
    super(props);
    this.toggleTooltip = this.toggleTooltip.bind(this);
    this.state = {
      isOpenTooltip: false,
      tooltipText: 'Click to copy',
    };
  }

  /**
   * @method toggleTooltip  : To toggle tooltip view.
   */
  toggleTooltip() {
    const { isOpenTooltip } = this.state;
    this.setState({
      isOpenTooltip: !isOpenTooltip,
    });
  }

  render() {
    const { hash, index, copyToClipboard } = this.props;
    const { tooltipText, isOpenTooltip } = this.state;
    return (
      <p
        aria-hidden
        style={{ cursor: 'pointer' }}
        id={`copyToClipboard_tooltip${index}`}
        onClick={e => copyToClipboard(e, hash)}
      >
        <span>TX#</span> 
        {' '}
        {hash}
        <Tooltip
          placement="top"
          isOpen={isOpenTooltip}
          target={`copyToClipboard_tooltip${index}`}
          toggle={this.toggleTooltip}
        >
          {tooltipText}
        </Tooltip>
      </p>
    );
  }
}
