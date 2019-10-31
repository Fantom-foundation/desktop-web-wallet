import React, { FC } from 'react';
import { Button } from 'reactstrap';
import classNames from 'classnames';
import * as styles from './styles.module.scss';
import { FaIcon } from '../../inputs/FaIcon';

interface IProps {
  onNextPressed: () => void;
  onBackPressed: () => void;
  is_next_disabled?: boolean;
  is_prev_disabled?: boolean;
}

const CreateAccountButtons: FC<IProps> = ({
  onNextPressed,
  onBackPressed,
  is_next_disabled,
  is_prev_disabled,
}) => (
  <section className={styles.buttons}>
    <Button
      className={classNames(styles.button, { [styles.disabled]: is_prev_disabled })}
      onClick={onBackPressed}
      disabled={is_prev_disabled}
    >
      <FaIcon icon="fa-chevron-left" />
      Back
    </Button>
    
    <Button
      className={classNames(styles.button, { [styles.disabled]: is_next_disabled })}
      onClick={onNextPressed}
      disabled={is_next_disabled}
    >
      Next
      <FaIcon icon="fa-chevron-right" />
    </Button>
  </section>
);

export { CreateAccountButtons };
