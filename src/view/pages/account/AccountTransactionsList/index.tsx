import React, { FC, useEffect, Fragment, useCallback, useMemo } from 'react';
import { IAccount } from '~/redux/account/types';
import { connect } from 'react-redux';
import { selectTransactions } from '~/redux/transactions/selectors';
import * as ACTIONS from '~/redux/transactions/actions';
import { FaIcon } from '~/view/components/inputs/FaIcon';
import styles from './styles.module.scss';
import Web3 from 'web3';
import classNames from 'classnames';
import { Address } from '~/view/components/account/Address';

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

  const onPrev = useCallback(() => {
    if (page === 0) return;

    transactionsSetPage(page - 1);
  }, [transactionsSetPage, page]);

  const onNext = useCallback(() => {
    if (list.length < 10) return;

    transactionsSetPage(page + 1);
  }, [transactionsSetPage, page]);

  const onRefresh = useCallback(() => {
    transactionsGetList(account.publicAddress);
  }, [transactionsGetList, account.publicAddress]);

  const sorted = useMemo(() => list.sort((a, b) => b.timestamp - a.timestamp), [
    list,
  ]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div onClick={onRefresh}>
          <FaIcon icon="fa-sync-alt" />
        </div>

        <h2>Transaction history</h2>

        <div
          onClick={onPrev}
          className={classNames({ [styles.is_disabled]: page === 0 })}
        >
          <FaIcon icon="fa-chevron-left" />
          Prev
        </div>

        <div
          onClick={onNext}
          className={classNames({
            [styles.is_disabled]: sorted.length < 10,
          })}
        >
          Next
          <FaIcon icon="fa-chevron-right" />
        </div>
      </div>

      <div className={styles.list_wrapper}>
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

        {!error && !is_loading && !sorted.length && (
          <div className={styles.empty_overlay}>
            <FaIcon icon="fa-stream" />
            <span>Transactions will appear here</span>
          </div>
        )}

        {!error && !is_loading && sorted.length && (
          <div className={styles.list}>
            <div className={styles.th}>From</div>
            <div className={styles.th}>To</div>
            <div className={styles.th}>Hash</div>
            <div className={classNames(styles.th, styles.center)}>Amount</div>

            {sorted.map(({ hash, from, to, value }) => (
              <Fragment key={hash}>
                <div>
                  <Address address={from} noIcon />
                </div>
                <div>
                  <Address address={to} noIcon />
                </div>
                <div>
                  <Address address={hash} noIcon />
                </div>
                <div className={styles.center}>
                  {value && parseFloat(Web3.utils.fromWei(value)).toFixed(5)}
                </div>
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const AccountTransactionsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountTransactionsListUnconnected);

export { AccountTransactionsList };
