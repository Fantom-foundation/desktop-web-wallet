import React, { FC } from 'react';
import { PanelProgress } from '~/view/components/panels/PanelProgress';

import create_account from '~/images/icons/create_account.svg';
import account_confirm from '~/images/icons/account_confirm.svg';
import { getURL } from '~/utility/dom';

const STAGES = [
  { icon: getURL(create_account), title: "Restore Account" },
  { icon: getURL(account_confirm), title: "Enter mnemonics" },
];

interface IProps {
  stepNo: number;
};

const AccountRestoreProcess: FC<IProps> = ({
  stepNo,
}) => (  
  <PanelProgress current={stepNo} stages={STAGES} />
)

export { AccountRestoreProcess };