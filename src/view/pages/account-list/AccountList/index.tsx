import React, { FC, useCallback } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Identicons from '~/view/general/identicons/identicons';
import { Address } from '~/view/components/common/Address';
import { selectAccount } from '~/redux/account/selectors';
import { connect } from 'react-redux';
import { push as historyPush } from 'connected-react-router';
import { URLS } from '~/constants/urls';

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
    <div id="account-management" className="account-management">
      <section className="page-title">
        <Container>
          <Row>
            <Col>
              <h2 className="title text-white text-center text-uppercase m-0">
                <span>Account Management</span>
              </h2>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="bg-dark" style={{ padding: '0 0 120px' }}>
        <Container className="account-card-container">
          <Row id="account-card" className="text-center ">
            {Object.values(list).length > 0 &&
              Object.values(list).map(account => (
                <Col
                  key={account.public_address}
                  md={6}
                  lg={3}
                  className="main-col"
                  onClick={onAccountSelect(account.public_address)}
                >
                  <div className="accounts-holder">
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
