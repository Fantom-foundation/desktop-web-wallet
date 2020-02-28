import { API, URLS, resultMiddleware, errorMiddleware } from '~/constants/api';

export const getTransactions = (
  address: string,
  offset: number,
  count: number
) => {
  console.log(URLS.GET_ACCOUNT, 'called');
  return API.get(URLS.GET_ACCOUNT, { params: { address, offset, count } })
    .then(resultMiddleware)
    .catch(errorMiddleware);
};

export const getFTMPrice = () => {
  API.get(
    'https://price.fantom.network/api/get-price'
  )
    .then(resultMiddleware)
    .catch(errorMiddleware);
};
