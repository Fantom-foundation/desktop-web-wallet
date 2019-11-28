import React, { FC, useEffect, Fragment, useCallback } from 'react';
import { IAccount } from '~/redux/account/types';
import { connect } from 'react-redux';
import { selectTransactions } from '~/redux/transactions/selectors';
import * as ACTIONS from '~/redux/transactions/actions';
import { FaIcon } from '~/view/components/inputs/FaIcon';
import styles from './styles.module.scss';
import Web3 from 'web3';
import classNames from 'classnames';

const mapStateToProps = state => ({
  transactions: selectTransactions(state),
});

const mapDispatchToProps = {
  transactionsGetList: ACTIONS.transactionsGetList,
  transactionsSetPage: ACTIONS.transactionsSetPage,
};

type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    account: IAccount;
  };

const AccountTransactionsListUnconnected: FC<IProps> = ({
  account,
  transactions: { is_loading, error, list, page },
  transactionsGetList,
  transactionsSetPage,
}) => {
  useEffect(() => {
    transactionsSetPage(0);
  }, [account.publicAddress]);

  useEffect(() => {
    transactionsGetList(account.publicAddress);
  }, [account.publicAddress, page, transactionsGetList]);

  const onNext = useCallback(() => {
    transactionsSetPage(page + 1);
  }, [transactionsSetPage, page]);

  return (
    <div>
      {is_loading && !error && (
        <div className={styles.connection_overlay}>
          <FaIcon icon="fa-sync-alt" spin />
          Getting transaction list
        </div>
      )}

      {error && (
        <div className={styles.error_overlay}>
          <FaIcon icon="fa-exclamation-triangle" />
          <span>{error}</span>
        </div>
      )}

      {!error && !is_loading && !list.length && (
        <div className={styles.empty_overlay}>
          <FaIcon icon="fa-stream" />
          <span>Transactions will appear here</span>
        </div>
      )}

      {!error && !is_loading && list.length && (
        <>
          <div>
            <div onClick={onNext}>Next</div>
          </div>

          <div className={styles.list}>
            <div className={styles.th}>From</div>
            <div className={styles.th}>To</div>
            <div className={styles.th}>Hash</div>
            <div className={classNames(styles.th, styles.center)}>Amount</div>

            {list.map(({ hash, from, to, value }) => (
              <Fragment key={hash}>
                <div>{from}</div>
                <div>{to}</div>
                <div>{hash}</div>
                <div className={styles.center}>
                  {value && parseFloat(Web3.utils.fromWei(value)).toFixed(5)}
                </div>
              </Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const AccountTransactionsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountTransactionsListUnconnected);

export { AccountTransactionsList };
