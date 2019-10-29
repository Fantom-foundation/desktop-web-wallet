import React, { HTMLAttributes } from 'react';
import { LayoutHeader } from '~/view/components/layout/LayoutHeader';
import { LayoutFooter } from '~/view/components/layout/LayoutFooter';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  noFooter?: boolean;
}

export class Layout extends React.PureComponent<IProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children, noFooter, className } = this.props;
    return (
      <div className={className}>
        <LayoutHeader />
        
        {children}

        {!noFooter && <LayoutFooter />}
      </div>
    );
  }
}
