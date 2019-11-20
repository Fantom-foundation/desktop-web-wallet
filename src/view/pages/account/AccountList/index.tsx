import React, { FC, useCallback } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Identicon from '~/view/general/Identicon';
import { Address } from '~/view/components/account/Address';
import { selectAccount } from '~/redux/account/selectors';
import { connect } from 'react-redux';
import { push as historyPush } from 'connected-react-router';
import { URLS } from '~/constants/urls';
import styles from './styles.module.scss';
import { pick } from 'ramda';
import { IState } from '~/redux';
import { IAccountState } from '~/redux/account';
import fileSaver from 'file-saver';
import { IAccount } from '~/redux/account/types';
import { AccountListItem } from '../AccountListItem';

const mapStateToProps = (state: IState): Pick<IAccountState, 'list'> =>
  pick(['list'])(selectAccount(state));
const mapDispatchToProps = {
  push: historyPush,
};

type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {};

const AccountListUnconnected: FC<IProps> = ({ list, push }) => {
  const onAccountSelect = useCallback(
    (address: string) => {
      console.log(address);
      push(URLS.ACCOUNT.BASE(address));
    },
    [push]
  );

  const save = useCallback((account: IAccount) => {
    const blob = new Blob([JSON.stringify(account.keystore)], {
      type: 'application/json;charset=utf-8',
    });
    fileSaver(blob, 'keystore.json');
  }, []);

  return (
    <div>
      <section>
        <Container className={styles.title}>
          <Row>
            <Col>
              <h2>
                <span>Account Management</span>
              </h2>
            </Col>
          </Row>
        </Container>
      </section>

      <section className={styles.content}>
        <Container>
          <div className={styles.grid}>
            {Object.values(list).length > 0 &&
              Object.values(list).map(account => (
                <AccountListItem
                  account={account}
                  onSelect={onAccountSelect}
                  onExport={save}
                  key={account.publicAddress}
                />
              ))}
          </div>
        </Container>
      </section>
    </div>
  );
};

const AccountList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountListUnconnected);

export { AccountList, AccountListUnconnected };
