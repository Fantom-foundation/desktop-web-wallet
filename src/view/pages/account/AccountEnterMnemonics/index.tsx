import React, { FC, useState, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import { selectAccountCreate } from '~/redux/account/selectors';
import { push as historyPush } from 'connected-react-router';
import { AccountRestoreProcess } from '~/view/components/account/AccountRestoreProcess';
import { Container, Row, Col, FormGroup, Label, Button } from 'reactstrap';
import { PanelTitle } from '~/view/components/panels/PanelTitle';
import { Textarea } from '~/view/components/inputs/Textarea';
import styles from './styles.module.scss';
import { DialogInfo } from '~/view/components/dialogs/DialogInfo';
import { DialogPrompt } from '~/view/components/dialogs/DialogPrompt';

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

  // id="account-information" className="account-information"

  return (
    <div>
      <AccountRestoreProcess stepNo={2} />

      <section className={styles.container}>
        <Container>
          <Row>
            <Col>
              <div className={styles.content}>
                <PanelTitle title="Restore Wallet" />

                <div className={styles.inputs}>
                  <FormGroup>
                    <Label for="wallet-seed">Wallet Seed</Label>

                    <Textarea
                      value={phrase}
                      handler={setPhrase}
                      placeholder="Separate each word with a single space"
                    />
                  </FormGroup>
                  <div className={styles.center}>
                    <p>Enter your secret twelve word phrase here to restore your vault.</p>

                    <p className={styles.warn}>Separate each word with a single space</p>
                  </div>
                </div>
              </div>

              <div className={styles.buttons}>
                <Button color="primary bordered" onClick={onSubmit}>
                  Create Wallet
                </Button>
                <Button color="secondary bordered" onClick={onCancelModalOpen}>
                  Cancel
                </Button>
              </div>
            </Col>
          </Row>
        </Container>

        <DialogPrompt
          title="Cancel Wallet"
          body="Are you sure you want to cancel the create wallet process?"
          onConfirm={accountCreateCancel}
          onClose={onCancelModalClose}
          isOpened={is_cancel_modal_opened}
        />

        <DialogInfo
          isOpened={is_incorrect_modal_visible}
          onClose={onIncorrectModalClose}
          body="The mnemonics you entered are incorrect"
          title="Incorrect Mnemonics"
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
