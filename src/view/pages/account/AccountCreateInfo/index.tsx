import React, {
  FC,
  useState,
  useCallback,
  useEffect,
  MouseEventHandler,
  useRef,
  useMemo,
} from 'react';
import { WalletModal } from '~/view/components/Modal';
import { Col, Row, Container, Label, FormGroup } from 'reactstrap';
import { AccountCreateProcess } from '~/view/components/account/AccountCreateProccess';
import { CreateAccountButtons } from '~/view/components/account/CreateAccountButtons';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import { selectAccountCreate } from '~/redux/account/selectors';
import { ACCOUNT_CREATION_STAGES } from '~/redux/account';
import Identicon from '~/view/general/Identicon';
import QRCodeIcon from '~/view/general/QRCodeIcon';
import ReactToPrint from 'react-to-print';
import AccountDetailPrint from '~/view/components/print/AccountDetailPrint';
import classNames from 'classnames';
import noView from '~/images/icons/no-view.png';
import { CONFIRMATION_PHRASE } from '~/redux/account/constants';
import styles from './styles.module.scss';
import { PanelTitle } from '~/view/components/panels/PanelTitle';
import { PanelButton } from '~/view/components/panels/PanelButton';
import { Address } from '~/view/components/account/Address';
import { TextInput } from '~/view/components/inputs/TextInput';
import { getURL } from '~/utility/dom';
import { Layout } from '~/view/components/layout/Layout';

// import { Input } from '../../components/forms';

import {
  MnemonicPhrase,
  MnemonicPhraseEmpty,
  MnemonicButtons,
  MnemonicPhraseWithCross,
} from 'src/view/components/mnemonic';
import { CreateWalletCard } from '../../../components/cards';
// import { Input } from '../../components/forms';

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
  publicAddress,
  icon,
}) => {
  const [is_revealed, setIsRevealed] = useState(false);
  const [modal, setModal] = useState(false);
  const [phrase, setPhrase] = useState('');

  const toggleModal = () => setModal(!modal);

  const is_next_disabled = useMemo(
    () =>
      phrase.toLowerCase().trim() !==
        CONFIRMATION_PHRASE.toLowerCase().trim() || !is_revealed,
    [is_revealed, phrase]
  );

  const onNextPressed = useCallback(() => {
    accountCreateSetInfo();
  }, [accountCreateSetInfo]);

  const onBackPressed = useCallback(
    () => accountSetCreateStage(ACCOUNT_CREATION_STAGES.CREDENTIALS),
    [accountSetCreateStage]
  );

  useEffect(() => {
    if (!mnemonic || !password || !publicAddress) onBackPressed();
  }, [mnemonic, onBackPressed, password, publicAddress]);

  const printer = useRef<any>(null);

  const onRevealSecret = useCallback<MouseEventHandler<HTMLDivElement>>(
    () => setIsRevealed(!is_revealed),
    [setIsRevealed, is_revealed]
  );

  return (
    <Layout>
      <div>
        <CreateWalletCard>
          <div className={styles.title}>
            <h3 className="font-weight-semi-bold">
              2<span className="opacity-3 mr-3">/2</span> Your mnemonic phrase
              <span className="ml-2">
                <i className="fas fa-info-circle" />
              </span>
            </h3>
            <p className={`${styles.warning} py-3`}>
              Please backup the text below on paper and keep it somewhere secret
              and safe.
            </p>
          </div>
          <div className={styles.phraseContent}>
            <MnemonicPhrase mnemonic={mnemonic.split(' ')} />
            {/* <MnemonicPhraseEmpty /> */}
            {/* <MnemonicPhraseWithCross /> */}
            {/* <MnemonicButtons /> */}
            <div className={styles.viewKey}>
              <span onClick={toggleModal}>
                <i className="fas fa-info-circle mr-2" />
                View your private key
              </span>
            </div>
          </div>

          <WalletModal isOpen={modal} toggle={toggleModal} bodyClassName="">
            <div className={styles.privateKeyModal}>
              <h2 className="text-center">Your Private Key</h2>
              <p className={styles.warning}>
                Please backup the text below on paper and keep it somewhere
                secret and safe.
              </p>
              <h3 className={`${styles.privateKey} font-weight-semi-bold`}>
                {publicAddress}
              </h3>
              <div className={styles.downloadBtnWrapper}>
                <button
                  type="button"
                  className={styles.downloadBtn}
                  onClick={toggleModal}
                >
                  Close
                </button>
              </div>
            </div>
          </WalletModal>

          <div className={styles.downloadBtnWrapper}>
            <button
              type="button"
              className={`${styles.downloadBtn}`}
              onClick={onNextPressed}
            >
              I wrote down my recovery key
            </button>
          </div>
        </CreateWalletCard>
      </div>
    </Layout>
    // <div id="account-information" className="account-information">
    //   {/* <AccountCreateProcess stepNo={2} /> */}

    //   <section className={styles.content}>
    //     <div className={styles.printer}>
    //       <div ref={printer}>
    //         <AccountDetailPrint mnemonic={mnemonic} address={publicAddress} />
    //       </div>
    //     </div>

    //     <Container>
    //       <Row className={styles.account}>
    //         <Col className={styles.info}>
    //           <div className={styles.name}>
    //             <Identicon id={icon} width={50} size={3} />
    //             {/* <h2>{name}</h2> */}
    //           </div>

    //           <h3>Your Address</h3>

    //           <div>
    //             <Address address={publicAddress} />
    //           </div>
    //         </Col>

    //         <Col className={styles.qr}>
    //           <QRCodeIcon
    //             bgColor="white"
    //             fgColor="black"
    //             address={publicAddress}
    //           />
    //         </Col>
    //       </Row>
    //     </Container>

    //     <Container className={styles.word_container}>
    //       <Row>
    //         <PanelTitle
    //           title="Owner Recovery Phrase"
    //           right={
    //             <ReactToPrint
    //               trigger={() => <PanelButton icon="fa-print" />}
    //               content={() => printer.current}
    //             />
    //           }
    //         />
    //       </Row>

    //       <Row className={styles.mnemonics}>
    //         <Col>
    //           <Row>
    //             <Col className={styles.mnemonics_content}>
    //               <div className={styles.mnemonics_collector}>
    //                 <div
    //                   className={classNames(styles.words, {
    //                     [styles.blur]: !is_revealed,
    //                   })}
    //                 >
    //                   {mnemonic &&
    //                     mnemonic.split(' ').map(word => (
    //                       <div className={styles.word} key={word}>
    //                         {word}
    //                       </div>
    //                     ))}

    //                   {!is_revealed && (
    //                     <div
    //                       className={styles.overlay}
    //                       onClick={onRevealSecret}
    //                     >
    //                       <h2>Click Here To Reveal Secret Words</h2>
    //                     </div>
    //                   )}
    //                 </div>
    //               </div>
    //             </Col>
    //           </Row>
    //           <Row>
    //             <Col className={styles.notice}>
    //               <img src={getURL(noView)} alt="no-view" />

    //               <h2>Screenshots are not secure</h2>

    //               <p>
    //                 If you take a screenshot, your backup may be viewed by other
    //                 apps. You can make a safe backup by writing it down on a
    //                 physical paper or by printing a copy.
    //               </p>
    //             </Col>
    //           </Row>
    //         </Col>
    //       </Row>
    //     </Container>

    //     <Container>
    //       <Row>
    //         <Col>
    //           <p className={styles.backup}>
    //             Please back up the recovery phrase now. Make sure to keep it
    //             private and secure. It allows full and unlimited access to your
    //             account, and can be used to restore your wallet.
    //           </p>

    //           <FormGroup>
    //             <Label for="msg" className={styles.label}>
    //               {!is_revealed ? 'Reveal secret words and type' : 'Type'}
    //               &nbsp;&quot;
    //               <span>{CONFIRMATION_PHRASE}</span>
    //               &quot;&nbsp; below to confirm it is backed up.
    //             </Label>

    //             <div>
    //               <TextInput
    //                 name="phrase"
    //                 type="text"
    //                 value={phrase}
    //                 handler={setPhrase}
    //                 autoComplete="off"
    //                 fa_icon="fa-pencil-alt"
    //               />
    //             </div>
    //           </FormGroup>
    //         </Col>
    //       </Row>
    //     </Container>
    //   </section>

    //   <CreateAccountButtons
    //     onNextPressed={onNextPressed}
    //     onBackPressed={onBackPressed}
    //     is_next_disabled={is_next_disabled}
    //   />
    // </div>
  );
};

const AccountCreateInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AccountCreateInfoUnconnected));

export { AccountCreateInfo, AccountCreateInfoUnconnected };
