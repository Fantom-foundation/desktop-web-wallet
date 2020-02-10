import React, { useState } from 'react';
import styles from './styles.module.scss';
import classnames from 'classnames';
import convertIcon from 'src/images/icons/convert.svg';

export default () => {
  const [range, setRange] = useState(200);
  const rangeFill = (range - 100) / 4;
  return (
    <div className={styles.root}>
      <div className={styles.valueWrapper}>
        <p className={styles.value}>
          <span>
            <span className="opacity-5">0</span>
            <h2 className={styles.tokeName}>iBTC</h2>
          </span>
        </p>
        <div className={classnames(styles.convert, 'text-center')}>
          <img src={convertIcon} alt="convert" />
          <p className="m-0">fUSD</p>
        </div>
      </div>
      <div className={styles.rangeWrapper}>
        <div className={styles.rangeInputWrapper}>
          <div className={styles.mainBar} />
          <div
            style={{
              width: `${rangeFill}%`,
              borderRadius: (rangeFill > 97 && '12px') || '12px 0 0 12px',
            }}
            className={styles.fillBar}
          />
          <input
            type="range"
            className={styles.input}
            min={100}
            max={500}
            step={1}
            value={range}
            onInput={e => {
              setRange(Number(e.currentTarget.value));
            }}
          />
        </div>
        <div className={styles.range}>
          <p>500%</p>
          <p>400%</p>
          <p>300%</p>
          <p>200%</p>
          <p>100%</p>
        </div>
      </div>
    </div>
  );
};
