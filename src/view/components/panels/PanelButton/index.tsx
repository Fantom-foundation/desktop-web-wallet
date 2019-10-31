import React, { FC, MouseEventHandler } from 'react';
import { Button } from 'reactstrap';
import * as styles from './styles.module.scss';
import { FaIcon } from '~/view/components/inputs/FaIcon';

interface IProps {
  icon: string;
  spin?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

const PanelButton: FC<IProps> = ({
  icon,
  spin,
  onClick,
}) => (
  <Button onClick={onClick} className={styles.button}>
    <FaIcon icon={icon} spin={spin} />
  </Button>
)

export { PanelButton };