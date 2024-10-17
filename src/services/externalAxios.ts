import { USER_TOKEN_LOCAL_STORAGE } from "../constants/index";
import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
// 3rd party libraries
import promise from "promise";
import { store } from "../redux/store";
import { LOGOUT_USER } from "../constants/actionTypes";

// Add a request interceptor
export const axiosInstance: AxiosInstance = axios.create();
let serverIP = "https://api.mirai.com/MiraiWebService";
// Intercepting all API requests
axiosInstance.interceptors.request.use(
  async function (config: any) {
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    config.url = serverIP + config.url;
    // }
    return config;
  },
  function (error) {
    return promise.reject(error);
  }
);

export const injectTokenInHeaders = async (headers: any = {}) => {
  let accessToken = await AsyncStorage.getItem(USER_TOKEN_LOCAL_STORAGE);
  if (accessToken) {
    headers["Authorization"] = "Basic c3RlbGxhZGltYXJlOnN0M2xsMmQxNjVhODll";
  }
  return headers;
};

// config should be an object
export const sendExternalAxiosRequest = async (parameters: {
  url: string;
  method: string;
  body?: {};
  query?: {};
  actions?: any | { apiCallSuccess: any; nullifyToast: any; apiCallFail: any };
  headers?: any;
}) => {
  const {
    url,
    method = "GET",
    body = {},
    query = {},
    actions,
    headers = {},
  } = parameters;
  let clonedQuery: any = { ...query };
  let clonedHeaders = await injectTokenInHeaders(headers);
  let requestPromise: AxiosPromise;
  switch (method) {
    case "POST":
      requestPromise = axiosInstance.post(url, body, {
        params: clonedQuery,
        headers: clonedHeaders,
      });
      break;

    case "GET":
      requestPromise = axiosInstance.get(url, {
        params: clonedQuery,
        headers: clonedHeaders,
      });
      break;

    case "PATCH":
      requestPromise = axiosInstance.patch(url, body, {
        params: clonedQuery,
        headers: clonedHeaders,
      });
      break;

    case "DELETE":
      requestPromise = axiosInstance.delete(url, {
        params: clonedQuery,
        headers: clonedHeaders,
      });
      break;

    default:
      throw new Error("UNKNOWN HTTP METHOD:: " + method);
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
    let error_message =
      err?.response?.data?.errors?.full_messages?.reduce(
        (acc: string, curr: string) => acc + "\n" + curr,
        ""
      ) || err?.message;
    if (Array.isArray(err?.response?.data?.errors)) {
      error_message = err?.response?.data?.errors?.reduce(
        (acc_1: string, curr_1: any) => {
          if (curr_1 && curr_1.hasOwnProperty("detail")) {
            return acc_1 + "\n" + curr_1.detail;
          } else {
            return acc_1 + "\n" + curr_1;
          }
        },
        ""
      );
    }
    err.custom_message = error_message;
    if (actions?.apiCallFail) {
      actions.apiCallFail(err);
      if (actions.nullifyToast) {
        setTimeout(() => {
          actions.nullifyToast();
        }, 3000);
      }
    }
    if (err?.response?.status === 401) {
      store.dispatch({
        type: LOGOUT_USER,
      });
      throw err;
    } else {
      throw err;
    }
  }
};
