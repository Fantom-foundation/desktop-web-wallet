import React, { HTMLAttributes } from 'react';
import { LayoutHeader } from '~/view/components/layout/LayoutHeader';
import { LayoutFooter } from '~/view/components/layout/LayoutFooter';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { selectModal } from '~/redux/modal/selectors';

const mapStateToProps = selectModal;

type IProps = HTMLAttributes<HTMLDivElement> & ReturnType<typeof mapStateToProps> & {
  noFooter?: boolean;
}

class LayoutUnconnected extends React.PureComponent<IProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children, noFooter, className, isOpened } = this.props;

    return (
      <div className={classNames(styles.layout, className, { [styles.blurred]: isOpened })}>
        <LayoutHeader isBlurred={isOpened} />
        
        {children}

        {!noFooter && <LayoutFooter />}
      </div>
    );
  }
}

const Layout = connect(mapStateToProps)(LayoutUnconnected);

export { Layout };