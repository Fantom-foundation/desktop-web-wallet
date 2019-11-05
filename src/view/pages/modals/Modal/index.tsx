import React, { FC, createElement, useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';
import { selectModal } from '~/redux/modal/selectors';
import { MODAL_CONTENT } from '~/redux/modal/constants';
import classNames from 'classnames';
import close from '~/images/icons/close.svg';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import * as MODAL_ACTIONS from '~/redux/modal/actions';

const mapStateToProps = selectModal;
const mapDispatchToProps = {
  modalHide: MODAL_ACTIONS.modalHide,
};

type IProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {};

const ModalUnconnected: FC<IProps> = ({ isOpened, modalHide, current }) => {
  const ref = useRef(null);
  const is_visible = isOpened && current && MODAL_CONTENT[current];

  useEffect(() => {
    if (is_visible) disableBodyScroll(ref, { reserveScrollBarGap: true });
    return () => {
      if (is_visible) {
        enableBodyScroll(ref);
      }
    };
  }, [ref, is_visible]);

  return createPortal(
    <>
      <div className={classNames(styles.shade, { [styles.active]: is_visible })} />

      <div className={classNames(styles.modal, { [styles.active]: is_visible })} ref={ref}>
        <div className={styles.header}>
          <div onClick={modalHide} className={styles.close}>
            <img src={close} alt="close" />
          </div>
        </div>

        {is_visible && current && (
          <div className={styles.content}>
            {createElement(MODAL_CONTENT[current], { onClose: modalHide })}
          </div>
        )}
      </div>
    </>,
    document.body
  );
};

const Modal = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalUnconnected);

export { Modal };
