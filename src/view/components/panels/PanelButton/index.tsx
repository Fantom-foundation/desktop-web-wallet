import React, { FC, MouseEventHandler } from 'react';
import { Button } from 'reactstrap';
import * as styles from './styles.module.scss';
import { FaIcon } from '~/view/components/common/FaIcon';

interface IProps {
  icon: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

const PanelButton: FC<IProps> = ({
  icon,
  onClick,
}) => (
  <Button onClick={onClick} className={styles.button}>
    <FaIcon icon={icon} />
  </Button>
)

export { PanelButton };