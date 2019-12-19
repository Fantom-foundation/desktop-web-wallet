/* eslint-disable react/no-multi-comp */
import React from 'react';
import mnemonicMock from './mnemonicMock';
import styles from './styles.module.scss';
import { Row, Col } from 'reactstrap';
import classnames from 'classnames';

export const MnemonicPhrase = () => (
  <Row className={styles.mnemonicRow}>
    {mnemonicMock.map(({ id, text }) => (
      <Col lg={4} className={classnames(styles.mnemonicCol, 'mt-4')} key={id}>
        <div className={styles.phrase}>
          <span className="opacity-5 mr-2">{id}</span>
          {text}
        </div>
      </Col>
    ))}
  </Row>
);
export const MnemonicPhraseWithCross = () => (
  <Row className={styles.mnemonicRow}>
    {mnemonicMock.map(({ id, text }) => (
      <Col lg={4} className={classnames(styles.mnemonicCol, 'mt-4')} key={id}>
        <div className={styles.phrase}>
          <span className="opacity-5 mr-2">{id}</span>
          {text}
          <button type="button" className={styles.cross}>
            <i className="fas fa-times-circle" />
          </button>
        </div>
      </Col>
    ))}
  </Row>
);

export const MnemonicPhraseEmpty = () => (
  <Row className={styles.mnemonicRow}>
    {mnemonicMock.map(({ id }) => (
      <Col lg={4} className={classnames(styles.mnemonicCol, 'mt-4')} key={id}>
        <div className={styles.phrase}>
          <span className="opacity-5 mr-2">{id}</span>
        </div>
      </Col>
    ))}
  </Row>
);

export const MnemonicButtons = () => (
  <Row className={styles.mnemonicRow}>
    {mnemonicMock.map(({ id, text }) => (
      <Col lg={4} className={classnames(styles.mnemonicCol, 'mt-4')} key={id}>
        <button
          type="button"
          className={classnames(styles.mnemonicBtn, {
            [styles.isDisable]: id === 3,
          })}
        >
          {text}
        </button>
      </Col>
    ))}
  </Row>
);
