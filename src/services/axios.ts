import axios, {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
} from 'axios';
import promise from 'promise';

export const axiosInstance: AxiosInstance = axios.create();
let serverIP = 'https://api.polygon.io';

axiosInstance?.interceptors.request.use(
  async function (config: any) {
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    config.url = serverIP + config.url;
    return config;
  },
  function (error) {
    return promise.reject(error);
  },
);

// THIS FUCTION IS USED TO FETCH THE DATA USING THE API AND GET THE RESPONSE
export const sendAxiosRequest = async (parameters: {
  url: string;
  method: string;
  body?: {};
  query?: {};
  actions?: any | {apiCallSuccess: any; nullifyToast: any; apiCallFail: any};
  headers?: any;
}) => {
  const {url, method = 'GET', body = {}, query = {}, actions} = parameters;
  let clonedQuery: any = {...query};

  let requestPromise: AxiosPromise;
  switch (method) {
    case 'GET':
      requestPromise = axiosInstance?.get(url, {
        params: clonedQuery,
      });
      break;
    default:
      throw new Error('UNKNOWN HTTP METHOD:: ' + method);
  }

  try {
    const res = await requestPromise;
    if (actions?.apiCallSuccess) {
      actions.apiCallSuccess(res?.data);
      if (actions.nullifyToast) {
        setTimeout(() => {
          actions.nullifyToast();
        }, 3000);
      }
    }
    return res;
  } catch (err: any) {
    let error_message = err?.response?.data.error || err?.message;
    err.custom_message = error_message;
    if (actions?.apiCallFail) {
      actions.apiCallFail(err);
      if (actions.nullifyToast) {
        setTimeout(() => {
          actions.nullifyToast();
        }, 3000);
      }
    }
    if (err?.response?.data?.error != null) {
      throw err;
    }
  }
};
