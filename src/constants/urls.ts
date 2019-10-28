export const URLS = {
  ROOT: '/',
  ACCOUNT_CREATE: '/account/create',
  ACCOUNT_LIST: '/accounts',
  ACCOUNT: {
    BASE: (address: string) => `/account/${address}`,
  },
};
