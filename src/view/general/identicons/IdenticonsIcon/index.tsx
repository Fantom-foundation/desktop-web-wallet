import React, { FC } from 'react';
import { FormGroup } from 'reactstrap';
import Identicons from '~/view/general/identicons/identicons';

type Props = {
  getRadioIconData: (value: string) => void;
  index: number;
  date: number;
  selectedIcon: string;
  accountIcon: string;
};

/**
 * IdenticonsIcon :  This component is meant for rendering IdenticonsIcon list in create account screen of wallet setup.
 */

const IdenticonsIcon: FC<Props> = ({
  index,
  date,
  selectedIcon,
  getRadioIconData,
  accountIcon,
}) => {
  const iconIndex = index.toString();
  const currentDate = date.toString();

  let identiconsId = iconIndex + currentDate;

  if (selectedIcon && index === 0) {
    identiconsId = selectedIcon;
  }

  if (selectedIcon === identiconsId && index !== 0) {
    const nextIndex = (index + 5).toString();
    identiconsId = nextIndex + currentDate;
  }

  const checked = !!(accountIcon && accountIcon === identiconsId);

  return (
    <li>
      <FormGroup className="form-radio-label">
        <label htmlFor={String(index)}>
          <div className="radio-holder">
            <input
              id={String(index)}
              name="name"
              className="form-radio-field"
              type="radio"
              checked={checked}
              onChange={() => getRadioIconData(identiconsId)}
            />

            <span />
          </div>

          <div className=" identicon-holder">
            <Identicons id={identiconsId} width={40} key={index} size={3} />
          </div>
        </label>
      </FormGroup>
    </li>
  );
};

export default IdenticonsIcon;
