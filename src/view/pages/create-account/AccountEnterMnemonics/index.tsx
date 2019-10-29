import React, { FC, useState, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import { selectAccountCreate } from '~/redux/account/selectors';
import { push as historyPush } from 'connected-react-router';
import { AccountRestoreProcess } from '~/view/components/create-account/AccountRestoreProcess';
import CancelWalletModal from '~/view/components/modals/cancel-wallet';
import IncorrectMnemonicsModal from '~/view/components/modals/incorrect-mnemonics';
import { Container, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';

const mapStateToProps = selectAccountCreate; 
const mapDispatchToProps = {
  accountCreateRestoreMnemonics: ACCOUNT_ACTIONS.accountCreateRestoreMnemonics,
  accountCreateCancel: ACCOUNT_ACTIONS.accountCreateCancel,
  push: historyPush,
};

type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  RouteComponentProps & {};

const AccountEnterMnemonicsUnconnected: FC<IProps> = ({
  accountCreateRestoreMnemonics,
  accountCreateCancel,
}) => {
  const [phrase, setPhrase] = useState('');
  const [is_cancel_modal_opened, setIsCancelModalOpened] = useState(false);
  const [is_incorrect_modal_visible, setIsIncorrectModalVisible] = useState(false);

  const is_next_disabled = useMemo<boolean>(() => {
    if (phrase.length === 0) return false;

    const words = phrase
      .split(' ')
      .map(el => el.trim())
      .filter(el => el.match(/^[A-Za-z]+$/));

    return words.length !== 12;
  }, [phrase]);
  const onPhraseChange = useCallback(event => setPhrase(event.target.value), [setPhrase]);

  const onCancelModalOpen = useCallback(() => {
    setIsCancelModalOpened(true);
  }, [setIsCancelModalOpened]);

  const onCancelModalClose = useCallback(() => {
    setIsCancelModalOpened(false);
  }, [setIsCancelModalOpened]);

  const onIncorrectModalClose = useCallback(() => {
    setIsIncorrectModalVisible(false);
  }, [setIsIncorrectModalVisible]);

  const onSubmit = useCallback(() => {
    if (is_next_disabled) return setIsIncorrectModalVisible(true);

    const mnemonic = phrase
      .split(' ')
      .map(el => el.trim())
      .filter(el => el.match(/^[A-Za-z]+$/))
      .join(' ');

    accountCreateRestoreMnemonics({ mnemonic });
  }, [is_next_disabled, accountCreateRestoreMnemonics, phrase]);

  return (
    <div id="account-information" className="account-information">
      <AccountRestoreProcess stepNo={2} />

      <section className="bg-dark" style={{ paddingTop: 60 }}>
        <Container>
          <Row>
            <Col>
              <div className="restore-confirm">
                <div className="wallet-bar">
                  <h2 className="title">
                    <span>Restore Wallet</span>
                  </h2>
                </div>
                <div className="vault-container bg-dark-light">
                  <FormGroup>
                    <Label for="wallet-seed">Wallet Seed</Label>
                    <Input
                      type="textarea"
                      name="wallet-seed"
                      id="wallet-seed"
                      placeholder="Separate each word with a single space"
                      onChange={onPhraseChange}
                      value={phrase}
                    />
                  </FormGroup>
                  <div className="text-center">
                    <p className="text-white">
                      Enter your secret twelve word phrase here to restore your vault.
                    </p>
                    <p className="text-danger">Separate each word with a single space</p>
                  </div>
                </div>
              </div>
              <div className="mnemonic-btn">
                <Button className="create-wallet" onClick={onSubmit}>
                  Create Wallet
                </Button>
                <Button className="cancel" onClick={onCancelModalOpen}>
                  Cancel
                </Button>
              </div>
            </Col>
          </Row>
        </Container>

        <CancelWalletModal
          toggleModal={is_cancel_modal_opened}
          cancelModalToggle={onCancelModalClose}
          cancelWallet={accountCreateCancel}
        />

        <IncorrectMnemonicsModal
          openIncorrectMnemonicsModal={is_incorrect_modal_visible}
          toggleIncorrectMnemonicsModal={onIncorrectModalClose}
        />
      </section>
    </div>
  );
};

const AccountEnterMnemonics = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AccountEnterMnemonicsUnconnected));

export { AccountEnterMnemonics };
