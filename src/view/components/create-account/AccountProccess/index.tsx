import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import create_account from '~/images/icons/create_account.svg';
import account_information from '~/images/icons/account_information.svg';
import account_confirm from '~/images/icons/account_confirm.svg';

interface IProps {
  stepNo: number;
  restoreAccount?: boolean;
}

export default class AccountProcess extends React.PureComponent<IProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * This method will return the className based on the step no
   */
  getClassName() {
    const { stepNo } = this.props;
    let className = '';
    if (!stepNo) {
      return className;
    }
    for (let i = 1; i <= stepNo; i += 1) {
      className = className.concat(`t-${i} `);
    }
    return className;
  }

  render() {
    const className = this.getClassName();
    const { restoreAccount } = this.props;
    return (
      <>
        <section style={{ padding: '30px 0' }}>
          <Container>
            <Row>
              <Col>
                <Row
                  id="account-process"
                  className={`${className} ${restoreAccount ? 'restore-account' : null}`}
                >
                  <Col className="c-1">
                    <svg viewBox="0 0 929.93 683.19" width="72.9" height="54">
                      <use xlinkHref={`${create_account}#icon`} />
                    </svg>
                    <h2>{restoreAccount ? 'Restore Wallet' : 'Create Account'}</h2>
                  </Col>

                  {!restoreAccount ? (
                    <Col className="text-center c-2">
                      <svg viewBox="0 0 929.93 683.19" width="72.9" height="54">
                        <use xlinkHref={`${account_information}#icon`} />
                      </svg>
                      <h2>Account Information</h2>
                    </Col>
                  ) : null}

                  <Col className={`text-right ${restoreAccount ? 'c-2' : 'c-3'}`}>
                    <svg viewBox="0 0 929.93 683.19" width="72.9" height="54">
                      <use xlinkHref={`${account_confirm}#icon`} />
                    </svg>
                    <h2>Confirm</h2>
                  </Col>
                  <div className="process-bar">
                    <div className="holder">
                      <span className="element e-1" />
                      <span className="element e-2" />
                      {!restoreAccount ? (
                        <>
                          <span className="element e-3" />
                          <span className="element e-4" />
                        </>
                      ) : null}
                    </div>
                  </div>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}
