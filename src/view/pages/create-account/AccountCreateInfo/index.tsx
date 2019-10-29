import React, {
  FC,
  useState,
  useCallback,
  useEffect,
  MouseEventHandler,
  useRef,
  ChangeEventHandler,
  useMemo,
} from 'react';
import { Col, Row, Container, Label, FormGroup, Input, Button } from 'reactstrap';
import AccountProcess from '~/view/components/create-account/AccountProccess';
import { CreateAccountButtons } from '~/view/components/create-account/CreateAccountButtons';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import { selectAccountCreate } from '~/redux/account/selectors';
import { ACCOUNT_CREATION_STAGES } from '~/redux/account';
import Identicons from '~/view/general/identicons/identicons';
import QRCodeIcon from '~/view/general/qr';
import { copyToClipboard } from '~/utility/clipboard';
import ReactToPrint from 'react-to-print';
import AccountDetailPrint from '~/view/components/print-form';
import classNames from 'classnames';
import noView from '~/images/icons/no-view.png';
import { CONFIRMATION_PHASE } from '~/redux/constants';

const mapStateToProps = selectAccountCreate;
const mapDispatchToProps = {
  accountCreateSetInfo: ACCOUNT_ACTIONS.accountCreateSetInfo,
  accountSetCreateStage: ACCOUNT_ACTIONS.accountSetCreateStage,
};

type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  RouteComponentProps & {};

const AccountCreateInfoUnconnected: FC<IProps> = ({
  accountSetCreateStage,
  accountCreateSetInfo,
  mnemonic,
  password,
  name,
  public_address,
  icon,
}) => {
  const [is_revealed, setIsRevealed] = useState(false);
  const [phrase, setPhrase] = useState('');

  const is_next_disabled = useMemo(
    () => phrase.toLowerCase().trim() !== CONFIRMATION_PHASE.toLowerCase().trim() || !is_revealed,
    [is_revealed, phrase]
  );

  const onNextPressed = useCallback(() => {
    if (is_next_disabled) return;

    accountCreateSetInfo();
  }, [accountCreateSetInfo, is_next_disabled]);

  const onBackPressed = useCallback(
    () => accountSetCreateStage(ACCOUNT_CREATION_STAGES.CREDENTIALS),
    [accountSetCreateStage]
  );

  useEffect(() => {
    if (!mnemonic || !password || !name || !public_address) onBackPressed();
  });

  const printer = useRef<any>(null);
  const onCopy = useCallback<MouseEventHandler<HTMLButtonElement>>(
    event => copyToClipboard(event, public_address),
    [public_address]
  );

  const onRevealSecret = useCallback<MouseEventHandler<HTMLButtonElement>>(
    () => setIsRevealed(!is_revealed),
    [setIsRevealed, is_revealed]
  );

  const onPhraseChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => setPhrase(value),
    [setPhrase]
  );

  return (
    <div id="account-information" className="account-information">
      <AccountProcess restoreAccount={false} stepNo={2} />

      <section className="bg-dark" style={{ padding: '60px 0' }}>
        <div style={{ display: 'none' }}>
          <div ref={printer}>
            <AccountDetailPrint mnemonic={mnemonic} address={public_address} />
          </div>
        </div>

        <Container>
          <Row className="acc-details bg-dark-light" style={{ marginBottom: 26 }}>
            <Col className="left-col">
              <div className="acc-qr">
                <QRCodeIcon bgColor="white" fgColor="black" address={public_address} />
              </div>
              <div className="acc-name-holder">
                <Identicons id={icon} width={50} size={3} />
                <h2 className="acc-name">{name}</h2>
              </div>
              <h3 className="address">Your Address</h3>
              <div className="account-no">
                <p>
                  <span>
                    <button type="button" className="clipboard-btn" onClick={onCopy}>
                      <i className="fas fa-clone" />
                    </button>
                  </span>
                  {public_address}
                </p>
              </div>
            </Col>

            <Col className="qr-col">
              <QRCodeIcon bgColor="white" fgColor="black" address={public_address} />
            </Col>
          </Row>
        </Container>

        <Container>
          <Row>
            <Col className="px-0">
              <div className="add-wallet">
                <h2 className="title ">
                  <span>Owner Recovery Phrase</span>
                </h2>
                <ReactToPrint
                  trigger={() => (
                    <Button>
                      <i className="fas fa-print" />
                    </Button>
                  )}
                  content={() => printer.current}
                />
              </div>
            </Col>
          </Row>

          <Row className="bg-dark-light" style={{ padding: '40px 0' }}>
            <Col>
              <Row style={{ padding: '0 0 40px' }}>
                <Col>
                  <div id="mnemonic-collector">
                    <ul className={classNames({ blur: !is_revealed })}>
                      {mnemonic && mnemonic.split(' ').map(word => <li key={word}>{word}</li>)}
                    </ul>

                    {!is_revealed && (
                      <button className="blur-overley" type="button" onClick={onRevealSecret}>
                        <div className="holder">
                          <h2>Click Here To Reveal Secret Words</h2>
                        </div>
                      </button>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="text-center no-capture">
                  <img src={noView} alt="no-view" />

                  <h2 className="text-danger">Screenshots are not secure</h2>

                  <p className="text-white mb-0">
                    If you take a screenshot, your backup may be viewed by other apps. You can make
                    a safe backup by writing it down on a physical paper or by printing a copy.
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>

        <Container className="acc-footer">
          <Row>
            <Col>
              <p className="text-white">
                Please back up the recovery phrase now. Make sure to keep it private and secure. It
                allows full and unlimited access to your account, and can be used to restore your
                wallet.
              </p>
              <FormGroup>
                <Label for="msg" className="text-white">
                  Type&nbsp;
                  <span className="text-primary">
                    &quot;
                    {CONFIRMATION_PHASE}
                    &quot;
                  </span>
                  &nbsp; below to confirm it is backed up.
                </Label>

                <div className="input-holder">
                  <Input
                    type="text"
                    name="msg"
                    onChange={onPhraseChange}
                    id="msg"
                    value={phrase}
                    autoFocus={false}
                    autoComplete="off"
                  />

                  <i className="fas fa-pencil-alt" />
                </div>
              </FormGroup>
            </Col>
          </Row>
        </Container>
      </section>

      <CreateAccountButtons
        onNextPressed={onNextPressed}
        onBackPressed={onBackPressed}
        is_next_disabled={is_next_disabled}
      />
    </div>
  );
};

const AccountCreateInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AccountCreateInfoUnconnected));

export { AccountCreateInfo };
