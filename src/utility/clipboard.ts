/* eslint-disable @typescript-eslint/no-explicit-any */
import copy from 'copy-to-clipboard';
import { toastr } from 'react-redux-toastr';

type ToasterType = {
  e: any,
  publicAddress: string,
  isStake?: boolean,
  estimateFee?: string



}

export const copyToClipboard = (e: any, publicAddress: string,  isStake?: boolean,  estimateFee?: number) => {
  e.stopPropagation();
  copy(publicAddress);
  if(isStake){
    toastr.success(`You need minimum ${estimateFee} in your balance to initiate unstake transaction`);
  } else {
    toastr.success('Copied to clipboard');
  }
}

