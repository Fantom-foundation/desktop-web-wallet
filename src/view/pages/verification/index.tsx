import React from 'react';
import styles from './styles.module.scss';

export default ({t}) => {
  return (
    <div className={styles.verification}>
      <h3 className="font-weight-semi-bold">{t("verification")}</h3>
      <p className="text-dark-grey-blue">
        {t("mnemonicOrderPhrase")}
.      
      </p>
    </div>
  );
};
