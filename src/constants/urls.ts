export const URLS = {
  ROOT: '/',
  ACCOUNT_CREATE: '/account/create',
  ACCOUNT_RESTORE: '/account/restore',
  ACCOUNT_LIST: '/accounts',
  ACCOUNT_SUCCESS: '/account/success',
  ACCOUNT: {
    BASE: (address: string) => `/account/${address}`,
  },
};
