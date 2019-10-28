import React, { FC, useCallback } from 'react';
import Layout from '~/view/components/layout';
import { Container, Row, Col } from 'reactstrap';
import Identicons from '~/view/general/identicons/identicons';
import ShowPublicAddress from '~/view/components/public-address';
import { selectAccount } from '~/redux/account/selectors';
import { connect } from 'react-redux';
import copyToClipboard from '~/utility';
import { push as historyPush } from 'connected-react-router';
import { URLS } from '~/constants/urls';

const mapStateToProps = selectAccount;
const mapDispatchToProps = {
  push: historyPush,
};

type IProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {};

const AccountListUnconnected: FC<IProps> = ({ list, push }) => {
  const onAccountSelect = useCallback((address: string) => () => {
    push(URLS.ACCOUNT.BASE(address))
  }, [push]);

  const onCopy = useCallback(
    public_address => event => {
      event.preventDefault();
      event.stopPropagation();
      copyToClipboard(event, public_address);
    },
    []
  );

  return (
    <div id="account-management" className="account-management">
      <Layout>
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
                    key={account.name}
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

                      <ShowPublicAddress
                        copyToClipboard={onCopy(account.public_address)}
                        publicAddress={account.public_address}
                      />
                    </div>
                  </Col>
                ))}
            </Row>
          </Container>
        </section>
      </Layout>
    </div>
  );
};

const AccountList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountListUnconnected);

export { AccountList };
