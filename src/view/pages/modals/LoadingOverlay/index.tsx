import React, { FC } from 'react';
import { FaIcon } from '~/view/components/inputs/FaIcon';
import styles from './styles.module.scss';

const LoadingOverlay: FC<{}> = () => (
  <div className={styles.loader}>
    <FaIcon icon="fa-sync-alt" spin />
  </div>
)

export { LoadingOverlay };