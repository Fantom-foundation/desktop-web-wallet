import React from 'react';
import styles from './styles.module.scss';
import classnames from 'classnames';

export default () => (
  <tr>
    <td>
      <span className={classnames(styles.orange, styles.circleShape)} />
      <span className={styles.leftSpace}>iBTC</span>
    </td>
    <td>5.70%</td>
    <td>
      <p className="mb-0">0 iBTC</p>
      <h5 className="mb-0 text-black opacity-6">0 fUSD</h5>
    </td>
    <td>0%</td>
  </tr>
);
