import {
  GET_STOCKS,
  GET_STOCKS_SUCCESS,
  GET_STOCKS_FAILURE,
  GET_MORE_STOCKS,
  GET_MORE_STOCKS_FAILURE,
  GET_MORE_STOCKS_SUCCESS
} from "../../../../constants/actionTypes";

// ==== GET STOCKS ==== //
export const getStocks = (search : string) => {
  return {
    type: GET_STOCKS,
    payload: {search},
  };
};

export const getStocksSuccess = (data: any) => {
  return {
    type: GET_STOCKS_SUCCESS,
    payload: { data },
  };
};

export const getStocksFailure = (errorMessage: string) => {
  return {
    type: GET_STOCKS_FAILURE,
    payload: { errorMessage },
  };
};

// ==== GET STOCKS ==== //
export const getMoreStocks = (search : string) => {
  return {
    type: GET_MORE_STOCKS,
    payload: {search},
  };
};

export const getMoreStocksSuccess = (data: any) => {
  return {
    type: GET_MORE_STOCKS_SUCCESS,
    payload: { data },
  };
};

export const getMoreStocksFailure = (errorMessage: string) => {
  return {
    type: GET_MORE_STOCKS_FAILURE,
    payload: { errorMessage },
  };
};


