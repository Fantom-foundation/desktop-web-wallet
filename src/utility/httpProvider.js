/* eslint-disable */
import axios from 'axios';

class HttpDataProvider {
  constructor() {
    if (HttpDataProvider.instance) HttpDataProvider.instance = this;

    // axios Configuration
    axios.defaults.headers.common = {
      'Content-Type': 'application/json',
    };
    axios.interceptors.response.use(
      response => {
        console.log(response, 'response');
        return response;
      },
      error =>
        // if (error.response.status === 401) {
        //   sessionStorage.clear();
        //   window.location.href = '/login';
        // }
        error
    );

    return HttpDataProvider.instance;
  }

  get = url => axios.get(url);

  post = (url, data) => axios.post(url, data);

  setHeaderToken = token => {
    axios.defaults.headers.common = { 'x-auth-token': token };
    sessionStorage.setItem('x-auth-token', token);
  };

  removeHeaderToken = () => {
    axios.defaults.headers = { 'x-auth-token': '' };
  };
}

const httpProvider = new HttpDataProvider();

Object.freeze(httpProvider);

export default httpProvider;
