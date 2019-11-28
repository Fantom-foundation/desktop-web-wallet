import { API, URLS, resultMiddleware, errorMiddleware } from '~/constants/api';

export const getTransactions = (
  address: string,
  offset: number,
  count: number
) =>
  API.get(URLS.GET_ACCOUNT, { params: { address, offset, count } })
    .then(resultMiddleware)
    .catch(errorMiddleware);
