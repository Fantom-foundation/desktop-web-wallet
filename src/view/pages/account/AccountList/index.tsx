import React, { FC, useCallback } from "react";
import { Container, Row, Col } from "reactstrap";
import Identicon from "~/view/general/Identicon";
import { Address } from "~/view/components/account/Address";
import { selectAccount } from "~/redux/account/selectors";
import { connect } from "react-redux";
import { push as historyPush } from "connected-react-router";
import { URLS } from "~/constants/urls";
import styles from "./styles.module.scss";
import { pick } from "ramda";
import { IState } from "~/redux";
import { IAccountState } from "~/redux/account";
import fileSaver from "file-saver";
import { IAccount } from "~/redux/account/types";

const mapStateToProps = (state: IState): Pick<IAccountState, "list"> =>
  pick(["list"])(selectAccount(state));
const mapDispatchToProps = {
  push: historyPush,
};

type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {};

const AccountListUnconnected: FC<IProps> = ({ list, push }) => {
  const onAccountSelect = useCallback(
    (address: string) => () => {
      push(URLS.ACCOUNT.BASE(address));
    },
    [push]
  );

  const save = useCallback((event, account: IAccount) => {
    event.preventDefault();
    event.stopPropagation();

    const blob = new Blob([JSON.stringify(account.keystore)], {
      type: "application/json;charset=utf-8",
    });
    fileSaver(blob, "keystore.json");
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
          <Row className={styles.grid} id="account-list-grid">
            {Object.values(list).length > 0 &&
              Object.values(list).map(account => (
                <Col
                  key={account.publicAddress}
                  md={6}
                  lg={3}
                  onClick={onAccountSelect(account.publicAddress)}
                >
                  <div className={styles.card}>
                    <div className="avatar">
                      <span className="avatar-icon">
                        <Identicon
                          id={account.icon}
                          width={40}
                          key={0}
                          size={3}
                        />
                      </span>
                    </div>

                    <h2 className="title ">
                      <span>{account.name}</span>
                    </h2>

                    <Address address={account.publicAddress} />

                    <div onClick={event => save(event, account)}>Save</div>
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

export { AccountList, AccountListUnconnected };
