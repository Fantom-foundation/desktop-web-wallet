import React from 'react';
import styles from './styles.module.scss';
import fantomIcon from 'src/images/logo/fantom-active.svg';
import dollarIcon from 'src/images/icons/dollar.svg';

const mockData = [
  { icon: fantomIcon, title: 'Fantom', value: '150,615.22 FTM' },
  { icon: dollarIcon, title: 'CSDT', value: '500 CSDT' },
];

export default () => (
  <ul className={styles.tokenList}>
    {mockData.map(({ icon, title, value }) => (
      <li key={title} className={styles.tokenListItem}>
        <div className={styles.logoWraper}>
          <img src={icon} alt={title} />
          <h4 className="mb-0">{title}</h4>
        </div>
        <h4 className="mb-0">{value}</h4>
      </li>
    ))}
  </ul>
);
