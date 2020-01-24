import React from 'react';
import { Input, Button } from 'reactstrap';
import { AccessWalletCard } from 'src/view/components/cards';
import { Layout } from '~/view/components/layout/Layout';
import classnames from 'classnames';
import { MnemonicIcon } from 'src/view/components/svgIcons';
import styles from './styles.module.scss';
import { useTranslation } from "react-i18next";

export default () => {
  const {t} = useTranslation()
  return (<Layout>
    <AccessWalletCard t={t}>
      <div className={styles.optionsWrapper}>
        <div className={styles.optionCol}>
          <div className={classnames(styles.option, styles.active)}>
            <MnemonicIcon />
            <h4 className="opacity-7">Mnemonic phrase</h4>
          </div>
        </div>
      </div>
      <div>
        <h4 className={classnames('opacity-7', styles.inputLabel)}>
          Please type in your 12-word mnemonic phrase
        </h4>
        <div className={styles.inputWrapper}>
          <Input
            type="textarea"
            className={classnames(styles.input, styles.textarea, {
              [styles.isError]: true,
            })}
          />
          <p className={styles.errorText}>Invalid recovery phrase</p>
        </div>
      </div>
      <div className="text-center">
        <Button color="primary" className={styles.btn}>
          Unlock wallet
        </Button>
      </div>
    </AccessWalletCard>
  </Layout>)
};
