import React from 'react';
import styles from './styles.module.scss';
import classnames from 'classnames';

export default () => (
  <>
    <tr>
      <td>
        <span className={classnames(styles.orange, styles.circleShape)} />
        <span className={styles.leftSpace}>iBTC</span>
      </td>
      <td>5.70%</td>
      <td>8904.62</td>
    </tr>
    <tr>
      <td>
        <span className={classnames(styles.darkBlue, styles.circleShape)} />
        <span className={styles.leftSpace}>iETH</span>
      </td>
      <td>5.70%</td>
      <td>8904.62</td>
    </tr>
  </>
);
