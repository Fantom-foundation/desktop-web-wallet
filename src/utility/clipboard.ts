/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import copy from 'copy-to-clipboard';
import { toastr } from 'react-redux-toastr';
import { useTranslation } from 'react-i18next';

type ToasterType = {
  e: any,
  publicAddress: string,
  isStake?: boolean,
  estimateFee?: string



}



// const AccountListUnconnected: FC<IProps> = ({
//   list,
//   push,
// }) => {

export const copyToClipboard = (e: any, publicAddress: string,  text: string, t,  isStake?: boolean,  estimateFee?: number) => {
  e.stopPropagation();
  // const { t } = useTranslation()
  copy(publicAddress);
  if(isStake){
    toastr.error(`You need minimum ${estimateFee} in your balance to initiate unstake transaction`);
  } else {
    toastr.success(t(text));
  }
}

