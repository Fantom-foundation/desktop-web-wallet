/* eslint-disable jsx-a11y/anchor-is-valid */
import { SendForm } from '../../../components/forms';
import { convertFTMValue } from '~/view/general/utilities';
import { useTranslation } from "react-i18next";
import React, {
  useEffect,
} from 'react';

import { connect } from 'react-redux';
import {
  selectAccount,
} from '~/redux/account/selectors';
import styles from './styles.module.scss';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';

const mapStateToProps = state => ({
  accountData: selectAccount(state),
});

const mapDispatchToProps = {
  accountGetBalance: ACCOUNT_ACTIONS.accountGetBalance,
};


const SendDetails = ({
  match: {
    params: { id },
  },
  accountGetBalance,
  accountData,
}) => {
  
  const account = accountData.list && id && accountData.list[id];
  const { t } = useTranslation();
  useEffect(() => {
    
     const interval = setInterval(() => {
      accountGetBalance(id);
    }, 30000);
    return () => clearInterval(interval);
  
  }, [accountGetBalance, id]);

  return (
    <div>
      <div className={styles.headWrapper}>
        <h3 className="mb-3 pb-1 opacity-5 font-weight-semi-bold">{t("balance")}</h3>
        <h2 className="mb-md-5">
          {convertFTMValue(parseFloat(account&& account.balance ? account.balance : '0'))}
          {' '}
FTM
        </h2>
      </div>
      <SendForm data={account} t={t} />
    </div>
  );
};

const SendDetailsData = connect(
  mapStateToProps,
  mapDispatchToProps
)(SendDetails);

export default SendDetailsData;
