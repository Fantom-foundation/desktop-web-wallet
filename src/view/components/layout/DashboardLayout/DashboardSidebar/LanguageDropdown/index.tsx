import React, { useState, useEffect, useCallback } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import classnames from 'classnames';
import styles from './styles.module.scss';
import LanguageIcon from 'src/images/icons/language-icon.svg';
import i18n from "i18next";
import OsLocale from 'os-locale';


const languages = [{ id: 'bl',name: 'System' },{ id: 'en',name: 'English' }, { id: 'kor', name: '中文' }, { id: 'chi', name: '한국어' }];
export default () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');

const getCurrentLang = useCallback(() => {
  if(i18n.language === 'en'){
    setCurrentLanguage('English')
    
  } else if(i18n.language === 'kor'){
    setCurrentLanguage('中文')

  } else if (i18n.language === 'chi'){
    setCurrentLanguage('한국어')

  }
}, [])

  useEffect(() => {
    getCurrentLang()
    
  }, [getCurrentLang]);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
        color="primary"
        className={classnames('p-0', styles.dropdownToggle)}
        caret
      >
        <img src={LanguageIcon} alt="language" />
        {currentLanguage}
      </DropdownToggle>
      <DropdownMenu>
        {languages.map(({ id, name }) => (
          <DropdownItem
            key={name}
            onClick={() =>{ 
              let lang = 'en';


              if(id === 'bl'){
                let currLang = 'English'
                OsLocale().then(res => {
                  const isChinese = res.toLowerCase().substring(0, 2) === 'zh'
                  const isKorean = res === 'ko' || res === 'ko_KR' || res === 'ko-KR'
                  if (isChinese) {
                    lang = 'chi'
                    currLang = "中文"
                  }
                  if(isKorean) {
                    lang = 'kor'
                    currLang = '한국어'
                  }
                  setCurrentLanguage(currLang)
                  localStorage.setItem('isManualLang', '')
                })

              } else {
                if(id === 'kor'){
                  lang = 'kor'
                } else if (id === 'chi'){
                  lang = 'chi'
                }
                localStorage.setItem('isManualLang', 'true')
                setCurrentLanguage(name)
              }


              i18n.changeLanguage(lang);
              localStorage.setItem('language', lang)    
            }}
          >
            {name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};