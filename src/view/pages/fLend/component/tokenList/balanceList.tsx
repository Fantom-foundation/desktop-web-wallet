import React from 'react';
import styles from './styles.module.scss';
import fantomActive from '../../../../../images/dashboard-icons/Archive/fantom-active.svg';
export default () => (
  <>
    <tr>
      <td>
        <img src={fantomActive} className="mr-3" alt="" />
        Fantom
      </td>
      <td>5.70%</td>
      <td>
        <p className="mb-0">150,615.22 FTM</p>
        <h5 className="mb-0 text-black opacity-6">1,506.15 fUSD</h5>
      </td>
      <td>
        <label className={styles.switch}>
          <input type="checkbox" />
          <span className={styles.switchContent} />
        </label>
      </td>
    </tr>
    <tr>
      <td>
        <img src={fantomActive} className="mr-3" alt="" />
        CSDT
      </td>
      <td>5.70%</td>
      <td>
        <p className="mb-0">500 CSDT</p>
        <h5 className="mb-0 text-black opacity-6">500 fUSD</h5>
      </td>
      <td>
        <label className={styles.switch}>
          <input type="checkbox" />
          <span className={styles.switchContent} />
        </label>
      </td>
    </tr>
  </>
);
