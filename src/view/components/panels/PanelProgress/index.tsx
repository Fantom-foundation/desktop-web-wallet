import React, { FC } from 'react';
import * as styles from './styles.module.scss';
import classNames from 'classnames';

interface IProps {
  current: number;
  stages: { icon: string; title: string }[];
}

const PanelProgress: FC<IProps> = ({ stages, current }) => (
  <div className={styles.wrap}>
    {stages.map((stage, index) => (
      <>
        <div className={classNames(styles.icon, { [styles.active]: index <= current - 1 })}>
          <svg viewBox="0 0 929.93 683.19" width="72.9" height="54">
            <use xlinkHref={`${stage.icon}#icon`} />
          </svg>

          <div className={styles.title}>{stage.title}</div>
        </div>

        {index !== stages.length - 1 && <div className={styles.spacer} />}
      </>
    ))}

    <div className={styles.line}>
      {stages.map(
        (stage, index) =>
          index !== stages.length - 1 && (
            <div
              className={classNames(styles.seg, {
                [styles.active]: index <= current - 2,
                [styles.current]: index === current - 1,
              })}
            />
          )
      )}
    </div>
  </div>
);

export { PanelProgress };
