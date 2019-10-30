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
import { AccountCreateProcess } from '~/view/components/create-account/AccountCreateProccess';
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
import * as styles from './styles.module.scss';
import { PanelTitle } from '~/view/components/panels/PanelTitle';
import { FaIcon } from '~/view/components/common/FaIcon';
import { PanelButton } from '~/view/components/panels/PanelButton';
import { Address } from '~/view/components/common/Address';
import { TextInput } from '~/view/components/inputs/TextInput';

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

  const onRevealSecret = useCallback<MouseEventHandler<HTMLDivElement>>(
    () => setIsRevealed(!is_revealed),
    [setIsRevealed, is_revealed]
  );

  return (
    <div id="account-information" className="account-information">
      <AccountCreateProcess stepNo={2} />

      <section className={styles.content}>
        <div className={styles.printer}>
          <div ref={printer}>
            <AccountDetailPrint mnemonic={mnemonic} address={public_address} />
          </div>
        </div>

        <Container>
          <Row className={styles.account}>
            <Col className={styles.info}>
              <div className={styles.name}>
                <Identicons id={icon} width={50} size={3} />
                <h2>{name}</h2>
              </div>

              <h3>Your Address</h3>

              <div>
                <Address address={public_address} />
              </div>
            </Col>

            <Col className={styles.qr}>
              <QRCodeIcon bgColor="white" fgColor="black" address={public_address} />
            </Col>
          </Row>
        </Container>

        <Container className={styles.word_container}>
          <Row>
            <PanelTitle
              title="Owner Recovery Phrase"
              right={
                <ReactToPrint
                  trigger={() => <PanelButton icon="fa-print" />}
                  content={() => printer.current}
                />
              }
            />
          </Row>

          <Row className={styles.mnemonics}>
            <Col>
              <Row>
                <Col className={styles.mnemonics_content}>
                  <div className={styles.mnemonics_collector}>
                    <div className={classNames(styles.words, { [styles.blur]: !is_revealed })}>
                      {mnemonic &&
                        mnemonic.split(' ').map(word => (
                          <div className={styles.word} key={word}>
                            {word}
                          </div>
                        ))}

                      {!is_revealed && (
                        <div className={styles.overlay} onClick={onRevealSecret}>
                          <h2>Click Here To Reveal Secret Words</h2>
                        </div>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className={styles.notice}>
                  <img src={noView} alt="no-view" />

                  <h2>Screenshots are not secure</h2>

                  <p>
                    If you take a screenshot, your backup may be viewed by other apps. You can make
                    a safe backup by writing it down on a physical paper or by printing a copy.
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row>
            <Col>
              <p className={styles.backup}>
                Please back up the recovery phrase now. Make sure to keep it private and secure. It
                allows full and unlimited access to your account, and can be used to restore your
                wallet.
              </p>

              <FormGroup>
                <Label for="msg" className={styles.label}>
                  Type&nbsp;
                  <span>
                    &quot;
                    {CONFIRMATION_PHASE}
                    &quot;
                  </span>
                  &nbsp; below to confirm it is backed up.
                </Label>

                <div>
                  <TextInput
                    value={phrase}
                    handler={setPhrase}
                    autoComplete="off"
                    fa_icon="fa-pencil-alt"
                  />
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
