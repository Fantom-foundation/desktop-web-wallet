import React, { FC, InputHTMLAttributes, useCallback, ChangeEventHandler } from 'react';
import { Input } from 'reactstrap';
import styles from './styles.module.scss';
import { FaIcon } from '../FaIcon';
import classNames from 'classnames';
import { getURL } from '~/utility/dom';

type IProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: string;
  label?: string;
  fa_icon?: string;
  handler?: (val: string) => void;
  error?: string;
  appearance?: 'seamless' | 'usual';
};

const TextInput: FC<IProps> = ({
  appearance = 'usual',
  label,
  icon,
  fa_icon,
  handler,
  ...props
}) => {
  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      if (!handler) return;
      handler(value);
    },
    [handler]
  );

  return (
    <div
      className={classNames(styles.input, styles[appearance], {
        [styles.has_icon]: icon || fa_icon,
      })}
    >
      {label && <div className={styles.label}>{label}:</div>}

      {fa_icon && <FaIcon icon={fa_icon} />}
      {icon && <img src={getURL(icon)} alt="icon" />}

      <input {...props} onChange={onChange} />
    </div>
  );
};

export { TextInput };
