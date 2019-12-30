import { API, URLS, resultMiddleware, errorMiddleware } from '~/constants/api';

export const getTransactions = (
  address: string,
  offset: number,
  count: number
) =>
  API.get(URLS.GET_ACCOUNT, { params: { address, offset, count } })
    .then(resultMiddleware)
    .catch(errorMiddleware);

export const getFTMPrice = () => {
  API.get(
    'http://ec2-18-216-196-200.us-east-2.compute.amazonaws.com:3000/api/get-price'
  )
    .then(resultMiddleware)
    .catch(errorMiddleware);
};
