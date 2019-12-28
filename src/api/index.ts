import axios from 'axios';

const getAPIPath = apiName => {
  switch (apiName) {
    case 'delegatorByAddress':
      return 'api/v1/delegator/address';
    case 'delegatorByStakerId':
      return 'api/v1/delegator/staker';
    case 'validatorList':
      return 'api/v1/staker';
    default:
      return '';
  }
};
const getApiPathName = apiName => {
  return `${process.env.REACT_APP_API_URL_FANTOM}${getAPIPath(apiName)}`;
};

export const getDataWithQueryString = async (apiName, queryString) =>
  axios.get(`${getApiPathName(apiName)}/${queryString}`);
export const putDataWithQueryString = (apiName, queryString, data) => {
  return axios.put(`${getApiPathName(apiName)}/${queryString}`, data);
};

export const postData = (apiName, data, queryParam = '') => {
  if (queryParam) {
    return axios.post(`${getApiPathName(apiName)}/${queryParam}`, data);
  }
  return axios.post(`${getApiPathName(apiName)}`, data);
};

export const deleteData = (apiName, data) => {
  return axios.delete(`${getApiPathName(apiName)}/${data}`);
};
