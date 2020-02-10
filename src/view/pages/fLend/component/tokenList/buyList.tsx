import React from 'react';
import styles from './styles.module.scss';
import classnames from 'classnames';

export default () => (
  <>
    <tr>
      <td>
        <span className={classnames(styles.orange, styles.circleShape)} />
        <h2 className={classnames('mb-0 font-weight-medium', styles.leftSpace)}>
          iBTC
        </h2>
      </td>
      <td>
        <h2 className="font-weight-medium mb-0">$8904.62</h2>
      </td>
    </tr>
    <tr>
      <td>
        <span className={classnames(styles.orange, styles.circleShape)} />
        <h2 className={classnames('mb-0 font-weight-medium', styles.leftSpace)}>
          iBTC
        </h2>
      </td>
      <td>
        <h2 className="font-weight-medium mb-0">$8904.62</h2>
      </td>
    </tr>
  </>
);
