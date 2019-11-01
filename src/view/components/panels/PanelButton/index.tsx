import React, { FC, MouseEventHandler, ButtonHTMLAttributes } from 'react';
import { Button } from 'reactstrap';
import * as styles from './styles.module.scss';
import { FaIcon } from '~/view/components/inputs/FaIcon';

type IProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: string;
  spin?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}; 

const PanelButton: FC<IProps> = ({
  icon,
  spin,
  onClick,
  ...props
}) => (
  <Button onClick={onClick} className={styles.button} {...props}>
    <FaIcon icon={icon} spin={spin} />
  </Button>
)

export { PanelButton };