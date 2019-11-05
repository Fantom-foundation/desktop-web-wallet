import React, { FC, TextareaHTMLAttributes, useCallback, ChangeEventHandler } from 'react';
import styles from './styles.module.scss';

type IProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  handler?: (val: string) => void;
  label?: string;
};

const Textarea: FC<IProps> = ({ label, handler, ...props }) => {
  const onChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    ({ target: { value } }) => {
      if (!handler) return;

      handler(value);
    },
    [handler]
  );

  return (
    <div className={styles.textarea}>
      {label && <div className={styles.label}>{label}:</div>}
      <textarea {...props} onChange={onChange} />
    </div>
  );
};

export { Textarea };
