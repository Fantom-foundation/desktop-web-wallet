import copy from 'copy-to-clipboard';
import { ToastStore } from 'react-toasts';

/**
 * @param {String to copy} publicAddress
 * This method will copy the passed string
 */
export default function copyToClipboard(e, publicAddress) {
  e.stopPropagation();
  copy(publicAddress);
  ToastStore.info('Copy to clipboard', 500);
}
