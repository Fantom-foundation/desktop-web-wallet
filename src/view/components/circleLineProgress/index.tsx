import React from 'react';
import styles from './styles.module.scss';
import classnames from 'classnames';
// progress={[
//   { text: 'Enter quantity', active: true },
//   { text: 'Confirm loan', active: false },
// ]}
export default props => {
  const { progress } = props;
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        {progress.map(({ text, active = false }, index) => (
          <div className={classnames(styles.step, { [styles.active]: active })}>
            <div className={styles.level}>{index + 1}</div>

            <p className={styles.label}>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
