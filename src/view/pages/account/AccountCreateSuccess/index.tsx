import React, { FC, useCallback } from 'react';
import {  Button } from 'reactstrap';
import { IAccount } from '~/redux/account/types';
import styles from './styles.module.scss';
import { CheckCircleIcon } from 'src/view/components/svgIcons';
import { Layout } from '~/view/components/layout/Layout';

// interface IProps {
//   history: any
// }

const AccountCreateSuccess = props => {
  const handleAccessWallet = useCallback(() => {
    const { history } = props
    history.push('/accounts')
  }, [props]);
  
  return (
    <Layout>
      <div className={styles.successModalWrap}>
        <div className={styles.successModal}>
          <div className="mb-4">
            <CheckCircleIcon />
          </div>
          <h2 className="text-center">You're all set!</h2>
          <p>You have successfully created your wallet.</p>
          <Button className="outlined mt-4" onClick={handleAccessWallet}>
              Access your wallet
          </Button>
        </div>
      </div> 
    </Layout>
  );
};

export { AccountCreateSuccess };
