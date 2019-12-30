import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://3.136.216.35:3100/api/v1/',
  timeout: 10000,
});

export const URLS = {
  GET_ACCOUNT: 'get-account',
};

export interface IApiErrorResult {
  detail?: string;
  code?: string;
}

export interface IResultWithStatus<T> {
  status: string;
  data?: Partial<T> & IApiErrorResult;
  error?: string;
  debug?: string;
}

export const HTTP_RESPONSES = {
  SUCCESS: 200,
  CREATED: 201,
  CONNECTION_REFUSED: 408,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
};

export const resultMiddleware = <T extends {}>({
  status,
  data,
}: {
  status: number;
  data: T;
}): { status: number; data: T } => {
  return { status, data }
};

export const errorMiddleware = <T extends any>(debug): IResultWithStatus<T> =>
  debug && debug.response
    ? debug.response
    : {
        status: HTTP_RESPONSES.CONNECTION_REFUSED,
        data: {},
        debug,
        error: 'Network error',
      };
