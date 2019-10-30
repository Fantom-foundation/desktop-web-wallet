import React, { FC, useState, useCallback, useEffect, useMemo, memo } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import { AccountCreateProcess } from '~/view/components/create-account/AccountCreateProccess';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import { selectAccountCreate } from '~/redux/account/selectors';
import { ACCOUNT_CREATION_STAGES } from '~/redux/account';
import IncorrectMnemonicsModal from '~/view/components/modals/incorrect-mnemonics';
import CancelWalletModal from '~/view/components/modals/cancel-wallet';
import shuffle from 'lodash/shuffle';
import * as styles from './styles.module.scss';

const mapStateToProps = selectAccountCreate;
const mapDispatchToProps = {
  accountCreateSetConfirm: ACCOUNT_ACTIONS.accountCreateSetConfirm,
  accountSetCreateStage: ACCOUNT_ACTIONS.accountSetCreateStage,
  accountCreateCancel: ACCOUNT_ACTIONS.accountCreateCancel,
};

type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  RouteComponentProps & {};

const AccountCreateConfirmUnconnected: FC<IProps> = memo(({
  accountSetCreateStage,
  accountCreateCancel,
  accountCreateSetConfirm,
  mnemonic,
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [is_cancel_modal_opened, setIsCancelModalOpened] = useState(false);
  const [is_incorrect_modal_visible, setIsIncorrectModalVisible] = useState(false);
  const shuffled_mnemonics = useMemo(() => shuffle(mnemonic && mnemonic.split(' ')), [mnemonic]);

  const is_next_disabled = useMemo(() => mnemonic !== selected.join(' '), [mnemonic, selected]);

  const onBackPressed = useCallback(
    () => accountSetCreateStage(ACCOUNT_CREATION_STAGES.CREDENTIALS),
    [accountSetCreateStage]
  );

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
    accountCreateSetConfirm();
  }, [is_next_disabled, accountCreateSetConfirm]);

  const onMnemonicRemove = useCallback(
    item => () => {
      setSelected(selected.filter(el => el !== item));
    },
    [setSelected, selected]
  );

  const onMnemonicSelect = useCallback(
    item => () => {
      setSelected([...selected, item]);
    },
    [setSelected, selected]
  );

  useEffect(() => {
    if (!mnemonic) onBackPressed();
  });

  return (
    <div>
      <AccountCreateProcess stepNo={3} />

      <section className={styles.content}>
        <Container>
          <Row>
            <Col>
              <div className={styles.mnemonics}>
                <h2>
                  Enter your mnemonics in the correct order to create your account below
                </h2>

                <Row className={styles.selectors}>
                  <Col>
                    <div className={styles.mnemonic_container}>
                      {selected.map(item => (
                        <div key={item} className={styles.item}>
                          <Button color="primary" onClick={onMnemonicRemove(item)}>
                            {item}
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className={styles.mnemonic_selector}>
                      {shuffled_mnemonics.map(item => (
                        <div key={item} className={styles.item}>
                          <Button
                            color="primary"
                            onClick={onMnemonicSelect(item)}
                            disabled={selected.includes(item)}
                          >
                            {item}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>
                <div className="mnemonic-btn">
                  <Button className="create-wallet" onClick={onSubmit}>
                    Create Wallet
                  </Button>
                  <Button className="cancel" onClick={onCancelModalOpen}>
                    Cancel
                  </Button>
                </div>
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
});

const AccountCreateConfirm = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AccountCreateConfirmUnconnected));

export { AccountCreateConfirm };
