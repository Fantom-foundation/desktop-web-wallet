import React, { FC, TextareaHTMLAttributes, useCallback, ChangeEventHandler } from 'react';
import * as styles from './styles.module.scss';

type IProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  handler?: (val: string) => void;
};

const Textarea: FC<IProps> = ({ handler, ...props }) => {
  const onChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    ({ target: { value } }) => {
      if (!handler) return;

      handler(value);
    },
    [handler]
  );

  return (
    <div className={styles.textarea}>
      <textarea {...props} onChange={onChange} />
    </div>
  );
};

export { Textarea };
