/* eslint-disable react/no-multi-comp */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useCallback, useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'reactstrap';
import Identicon from '~/view/general/Identicon';
import { Address } from '~/view/components/account/Address';
import { selectAccount } from '~/redux/account/selectors';
import { connect } from 'react-redux';
import { push as historyPush, push } from 'connected-react-router';
import { URLS } from '~/constants/urls';
import styles from './styles.module.scss';
import { pick } from 'ramda';
import { IState } from '~/redux';
import { IAccountState } from '~/redux/account';
import fileSaver from 'file-saver';
import { IAccount } from '~/redux/account/types';
import { AccountListItem } from '../AccountListItem';
import { useTranslation } from "react-i18next";
import { geolocated } from "react-geolocated";
import detectBrowserLanguage from 'detect-browser-language'

import { Layout } from '~/view/components/layout/Layout';
import i18n from "i18next";
import { Link } from 'react-router-dom';
import KeyIcon from '../../../../images/icons/key.png';
import WalletIcon from '../../../../images/icons/wallet.png';
import { AddressBalanceCard } from '../../../components/cards';
import classnames from 'classnames';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';

const mapStateToProps = (state: IState): Pick<IAccountState, 'list'> =>
  pick(['list'])(selectAccount(state));
const mapDispatchToProps = {
  push: historyPush,
};

type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    coords: any,
    isGeolocationAvailable: any,
    isGeolocationEnabled: any,
    push: any,


  };

const AccountListUnconnected: FC<IProps> = ({
  list,
  push,
}) => {
  const onAccountSelect = useCallback(
    (address: string) => {
      push(URLS.ACCOUNT.BASE(address));
    },
    [push]
  );

  console.log(i18n.language, '*******asd')

  const getBrowserLang = () => {
    const res = detectBrowserLanguage()
        let locale = localStorage.getItem('language')
        const isEnglish = res.toLowerCase().substring(0, 2) === 'en'
        const isChinese = res.toLowerCase().substring(0, 2) === 'zh'
        const isKorean = res === 'ko' || res === 'ko_KR' || res === 'ko-KR'
        if (isChinese) locale = 'chi'
        if(isKorean) locale = 'kor'
        if(isEnglish) locale = 'en'
        return locale

  }

  const setSystemLang = useCallback(() => {
    const isChecked = localStorage.getItem('isManualLang')
    if(isChecked !== 'true'){
      const locale = getBrowserLang()
        localStorage.setItem('language', locale ||'')
    }
  }, [])



  useEffect(() => {
    setSystemLang()
   
  }, [setSystemLang]);

  const goToRoute = type => {
    if(type === 'create'){
      push('/account/create');
    } else if(type === 'access'){
      push('/account/restore');
    }
  };
  const { t } = useTranslation();
  console.log(list, '******list')

  const setAppLanguage = lang => {
    // const currLang = localStorage.getItem('language') || i18n.language 
    let currLang = ''
    if(lang === 'browser'){
      const res = getBrowserLang() || ''
      currLang = res
      
      localStorage.setItem('isManualLang', '')


    } else if(lang === 'en'){
        currLang = 'en'
      } else if (lang === 'kor'){
        currLang = 'kor'

      } else if(lang === 'chi'){
        currLang = 'chi'

      }

      if(lang !== 'browser'){
        localStorage.setItem('isManualLang', 'true')
      }
    i18n.changeLanguage(currLang);
    localStorage.setItem('language', currLang)  

  }

  const renderCreateAccessCards = (isActive) => {
    if(!isActive){
      return null;
    }
    return (<div className={styles.homeWrapper}>
          <Container>
            <div className={styles.desktopView}>
              <Row>
                <Col xl={6} lg={12} className={styles.marginBottom}>
                  <Card
                    className={classnames(
                      'bg-dark-periwinkle text-white h-100',
                      styles.card
                    )}
                  >
                    <div className={styles.cardContent}>
                      <div className={styles.cardIcon}>
                        <img src={WalletIcon} alt="wallet" />
                      </div>
                      <div className={styles.homecontent}>
                        <div className={styles.text}>
                          <h2>{t('createNewWallet')}</h2>
                          <p className="text-white">
                            {t('generateFantomWalletText')}
.
                          </p>
                        </div>
                        <button
                          type="button"
                          className={styles.walletBtn}
                          onClick={() => goToRoute('create')}
                        >
                          {t("getStarted")}
                          <i className="fas fa-chevron-right" />
                        </button>
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col xl={6} lg={12} md={12} className={styles.marginBottom}>
                  <Card
                    className={classnames(
                      'bg-topaz text-white h-100',
                      styles.card
                    )}
                  >
                    <div className={styles.cardContent}>
                      <div className={styles.cardIcon}>
                        <img src={KeyIcon} alt="key" />
                      </div>
                      <div className={styles.homecontent}>
                        <div className={styles.text}>
                          <h2>{t("accessWallet")}</h2>
                          <p className="text-white">
                            {t("connectFantomNetwork")}
:
                            <ul>
                              <li>{t("sendRecieveFTM")}</li>
                              <li>{t("stakeFTM")}</li>
                              <li>{t("collectRewards")}</li>
                            </ul>
                          </p>
                        </div>
                        <button type="button" className={styles.walletBtn} onClick={() => goToRoute('access')}>
                          {t("accessNow")}
                          <i className="fas fa-chevron-right" />
                        </button>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
            <div className={styles.mobileView}>
              <Row>
                <Col lg={12} className="mb-4">
                  <button
                    type="button"
                    className={classnames(
                      'bg-dark-periwinkle',
                      styles.mobileBtn
                    )}
                    onClick={() => goToRoute('create')}
                  >
                    {t("createNewWallet")}
                  </button>
                </Col>
                <Col lg={12} className="mb-4">
                  <button
                    type="button"
                    className={classnames('bg-topaz', styles.mobileBtn)}
                    onClick={() => goToRoute('access')}
                  >
                    {t("accessWallet")}
                  </button>
                </Col>
              </Row>
            </div>
          </Container>
        </div>)
  }
  let isAvailAcc = false;


  return (
    <Layout>
      <div className={styles.banner}>
        <Container>
          <h1 className={styles.homeTitle}>{t('welcomeFantomWallet')}</h1>
          <h3>
            {t('sendReceiveStakeFTM')}
          </h3>
          <h3>
            <span className={classnames("pointer")} onClick={() => setAppLanguage('browser')}>{t("browser")}</span>
            {" "}
            <span className={classnames("pointer",{['text-underline']:i18n.language === 'en' })} onClick={() => setAppLanguage('en')}>English</span>
            {" "} 
            <span className={classnames("pointer",{['text-underline']:i18n.language === 'kor' })} onClick={() => setAppLanguage('kor')}>한국어</span>
            {" "}
            <span className={classnames("pointer",{['text-underline']:i18n.language === 'chi' })} onClick={() => setAppLanguage('chi')}>简体中文</span> 
          </h3>
        </Container>
      </div>
      {!!list && Object.values(list).length > 0 && (
        <div className={styles.homeWrapper}>
          <Container className={styles.container}>
            <Row>
              {Object.values(list).length > 0 &&
                Object.values(list).map(account => {
                  if(account.publicAddress){
                    isAvailAcc = true
                    return (
                      <Col
                        lg={6}
                        md={6}
                        className={styles.marginBottom}
                        onClick={() => onAccountSelect(account.publicAddress)}
                      >
                        <AddressBalanceCard
                          address={account.publicAddress}
                        />
                      </Col>
                    );
                  }
                  return null
                  
                })}
              {isAvailAcc && <Col lg={6} md={6} className={styles.marginBottom}>
                <AddressBalanceCard
                  addNew
                />
              </Col> }
            </Row>
          </Container>
        </div>
      )}
      {renderCreateAccessCards(!isAvailAcc)}
    </Layout>
    // </Layout>
    // <div>
    //   <section>
    //     <Container className={styles.title}>
    //       <Row>
    //         <Col>
    //           <h2>
    //             <span>Account Management</span>
    //           </h2>
    //         </Col>
    //       </Row>
    //     </Container>
    //   </section>

    //   <section className={styles.content}>
    //     <Container>
    //       <div className={styles.grid}>
    //         {Object.values(list).length > 0 &&
    //           Object.values(list).map(account => (
    //             <AccountListItem
    //               account={account}
    //               onSelect={onAccountSelect}
    //               key={account.publicAddress}
    //             />
    //           ))}
    //       </div>
    //     </Container>
    //   </section>
    // </div>
  );
};


const AccountList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountListUnconnected);


export { AccountList, AccountListUnconnected };
