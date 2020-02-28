import React, {  useCallback } from 'react';
import {  Button } from 'reactstrap';
import styles from './styles.module.scss';
import { CheckCircleIcon } from 'src/view/components/svgIcons';
import { Layout } from '~/view/components/layout/Layout';
import { useTranslation } from "react-i18next";


const AccountCreateSuccess = props => {
  const handleAccessWallet = useCallback(() => {
    const { history } = props
    history.push('/accounts')
  }, [props]);
  const { t } = useTranslation();

  
  return (
    <Layout>
      <div className={styles.successModalWrap}>
        <div className={styles.successModal}>
          <div className="mb-4">
            <CheckCircleIcon />
          </div>
          <h2 className="text-center">{t("youAllSet")}</h2>
          <p>
            {t("successfullyCreatedWallet")}
.
          </p>
          <Button className="outlined mt-4" onClick={handleAccessWallet}>
            {t("accessWallet")}
          </Button>
        </div>
      </div> 
    </Layout>
  );
};

export { AccountCreateSuccess };
