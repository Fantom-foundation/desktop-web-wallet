import React from 'react';
import { Input } from 'reactstrap';
import styles from './styles.module.scss';
import SearchIcon from 'src/images/dashboard-icons/Archive/search.svg';

export default () => (
  <div className={styles.search}>
    <Input type="search" name="email" placeholder="Search tokens" />
    <img src={SearchIcon} alt="search" />
  </div>
);
