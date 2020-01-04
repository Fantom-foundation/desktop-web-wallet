import copy from 'copy-to-clipboard';
import { toastr } from 'react-redux-toastr';


export const copyToClipboard = (e, publicAddress: string) => {
  e.stopPropagation();
  copy(publicAddress);
  toastr.success('Copied to clipboard');
}

