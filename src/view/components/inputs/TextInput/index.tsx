import React, { FC, InputHTMLAttributes, useCallback, ChangeEventHandler } from 'react';
import { Input } from 'reactstrap';
import * as styles from './styles.module.scss';
import { FaIcon } from '../../common/FaIcon';
import classNames from 'classnames';

type IProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: string;
  fa_icon?: string;
  handler?: (val: string) => void;
  error?: string;
};

const TextInput: FC<IProps> = ({ icon, fa_icon, handler, ...props }) => {
  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      if (!handler) return;
      handler(value);
    },
    [handler]
  );

  return (
    <div className={classNames(styles.input, { [styles.has_icon]: icon || fa_icon })}>
      {fa_icon && <FaIcon icon={fa_icon} />}
      {icon && <img src={icon} alt="icon" />}
      <input {...props} onChange={onChange} />
    </div>
  );
};

export { TextInput };
