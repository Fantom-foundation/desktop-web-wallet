/* eslint-disable react/no-multi-comp */
import React from 'react';
import mnemonicMock from './mnemonicMock';
import styles from './styles.module.scss';
import { Row, Col } from 'reactstrap';
import classnames from 'classnames';

export const MnemonicPhrase = ({ mnemonic }) => (
  <Row className={styles.mnemonicRow}>
    {mnemonic.map((word, index) => (
      <Col
        xs={6}
        sm={4}
        className={classnames(styles.mnemonicCol, 'mt-4')}
        key={index + 1}
      >
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
      <Col
        xs={6}
        sm={4}
        className={classnames(styles.mnemonicCol, 'mt-4')}
        key={id}
      >
        <div className={styles.phrase}>
          <span className="opacity-5 mr-2">{id}</span>
          {text}
        </div>
      </Col>
    ))}
  </Row>
);

export const MnemonicPhraseEmpty = ({ selected, onMnemonicRemove }) => (
  <Row className={styles.mnemonicRow}>
    {mnemonicMock.map((word, index) => (
      <Col
        xs={6}
        sm={4}
        className={classnames(styles.mnemonicCol, 'mt-4')}
        key={index + 1}
      >
        <div className={styles.phrase}>
          <span className="opacity-5 mr-2">{index + 1}</span>
          {selected[index] && selected[index].name || ''}
          { selected[index] && selected[index].name && (
            <button
              type="button"
              onClick={() => onMnemonicRemove(selected[index])}
              className={styles.cross}
            >
              <i className="fas fa-times-circle" />
            </button>
          )}
        </div>
      </Col>
    ))}
  </Row>
);

export const MnemonicButtons = ({ mnemonic, selected, onMnemonicSelect }) => {
  // let btnDisabled = false;
  // if(mnemonic && mnemonic.length > 0){
  //   mnemonic.forEach(item => {
  //     selected.forEach((select) => {
  //       if(select.index === item.index){
  //         btnDisabled = true;
  //       }
  //     })
     

  //   })
  // }
  return (<Row className={styles.mnemonicRow}>

    {mnemonic && mnemonic.length > 0 && mnemonic.map((word, index) => {
      return (
        <Col
          xs={6}
          sm={4}
          className={classnames(styles.mnemonicCol, 'mt-4')}
          key={word.index}
        >
          <button
            type="button"
            onClick={() => onMnemonicSelect(word)}
            disabled={!word.isClickable}
            className={classnames(styles.mnemonicBtn, {
              [styles.isDisable]: !word.isClickable,
            })}
          >
            {word.name}
          </button>
        </Col>
      );
    })}
  </Row>)
};
