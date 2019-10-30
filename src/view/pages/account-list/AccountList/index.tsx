import React, { FC, useCallback } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Identicons from '~/view/general/identicons/identicons';
import { Address } from '~/view/components/common/Address';
import { selectAccount } from '~/redux/account/selectors';
import { connect } from 'react-redux';
import { push as historyPush } from 'connected-react-router';
import { URLS } from '~/constants/urls';
import * as styles from './styles.module.scss';

const mapStateToProps = selectAccount;
const mapDispatchToProps = {
  push: historyPush,
};

type IProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {};

const AccountListUnconnected: FC<IProps> = ({ list, push }) => {
  const onAccountSelect = useCallback(
    (address: string) => () => {
      push(URLS.ACCOUNT.BASE(address));
    },
    [push]
  );

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
          <Row className={styles.grid}>
            {Object.values(list).length > 0 &&
              Object.values(list).map(account => (
                <Col                  
                  key={account.public_address}
                  md={6}
                  lg={3}
                  onClick={onAccountSelect(account.public_address)}
                >
                  <div className={styles.card}>
                    <div className="avatar">
                      <span className="avatar-icon">
                        <Identicons id={account.icon} width={40} key={0} size={3} />
                      </span>
                    </div>

                    <h2 className="title ">
                      <span>{account.name}</span>
                    </h2>

                    <Address
                      address={account.public_address}
                    />
                  </div>
                </Col>
              ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

const AccountList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountListUnconnected);

export { AccountList };
