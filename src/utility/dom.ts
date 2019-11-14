import path from 'path';

export const getURL = (url: string): string => {
  const remote =
    window &&
    window.require &&
    window.require('electron') &&
    window.require('electron').remote &&
    window.require('electron').remote.app &&
    window.require('electron').remote.app.getAppPath();

  return path.join(remote || '', url);
};
