/* eslint-disable react/no-multi-comp */
import React from 'react';
import mnemonicMock from './mnemonicMock';
import styles from './styles.module.scss';
import { Row, Col } from 'reactstrap';
import classnames from 'classnames';

export const MnemonicPhrase = ({mnemonic}) => (
  <Row className={styles.mnemonicRow}>
    {mnemonic.map((word, index) => (
      <Col lg={4} className={classnames(styles.mnemonicCol, 'mt-4')} key={index + 1}>
        <div className={styles.phrase}>
          <span className="opacity-5 mr-2">{index + 1}</span>
          {word}
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
         
        </div>
      </Col>
    ))}
  </Row>
);

export const MnemonicPhraseEmpty = ({selected, onMnemonicRemove}) => (
  <Row className={styles.mnemonicRow}>
    {mnemonicMock.map((word, index) => (
      <Col lg={4} className={classnames(styles.mnemonicCol, 'mt-4')} key={index +1}>
        <div className={styles.phrase}>
          <span className="opacity-5 mr-2">{index + 1}</span>
          {selected[index] || ''}
          { selected[index] && <button type="button" onClick={onMnemonicRemove(selected[index])} className={styles.cross}>
            <i className="fas fa-times-circle" />
          </button>}
        </div>
      </Col>
    ))}
  </Row>
);

export const MnemonicButtons = ({mnemonic,selected, onMnemonicSelect }) => (
  <Row className={styles.mnemonicRow}>
    {mnemonic.map((word, index) => {
        console.log(selected.includes(word), '*****selected.includes(word)')

      return (<Col lg={4} className={classnames(styles.mnemonicCol, 'mt-4')} key={index}>
        <button
          type="button"
          onClick={onMnemonicSelect(word)}
          disabled={selected.includes(word)}
          className={classnames(styles.mnemonicBtn, {
            [styles.isDisable]: selected.includes(word),
          })}
        >
          {word}
        </button>
      </Col>)
    })}
  </Row>
);
