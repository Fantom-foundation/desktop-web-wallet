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


const languages = [{ id: 'en',name: 'English' }, { id: 'kor', name: '한국어(kor)' }, { id: 'chi', name: '중국말(chi)' }];
export default () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');

console.log('****i18n', i18n)
const getCurrentLang = useCallback(() => {
  if(i18n.language === 'en'){
    setCurrentLanguage('English')
    
  } else if(i18n.language === 'kor'){
    setCurrentLanguage('한국어(kor)')

  } else if (i18n.language === 'chi'){
    setCurrentLanguage('중국말(chi)')

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
            if(id === 'kor'){
              lang = 'kor'


            } else if (id === 'chi'){
              lang = 'chi'
            }
            setCurrentLanguage(name)
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