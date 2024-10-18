import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  GET_MORE_STOCKS,
  GET_STOCKS,
} from "../../../../constants/actionTypes";
import {
  getStocksRequest,
  getMoreStocksRequest
} from "../services";
import { getMoreStocksFailure, getMoreStocksSuccess, getStocksFailure, getStocksSuccess } from "../actions";
import { handleErrorAlert } from "../../../../constants/commonFunctions";




function* fetchStocks(data: any) {
  const {
    payload: { search },
  } = data;
  try {
    // @ts-ignore
    const response = yield call(getStocksRequest, { search });
    const data = response.data;
    if(data != undefined){
    yield put(getStocksSuccess(data));
  }
  }catch (error: any) {
    const errorMessage = error?.response?.data?.message || error.message || "Failed";
    yield put(getStocksFailure(errorMessage));
    if (error?.response?.status !== 401) {
     
    }
  }
}

function* fetchMoreStocks(data: any) {
  const {
    payload: { next },
  } = data;
  try {
    // @ts-ignore
    const response = yield call(getMoreStocksRequest, { next });
    const data = response.data;
    if(data != undefined){
    yield put(getMoreStocksSuccess(data));
  }
  }catch (error: any) {
    const errorMessage = error?.response?.data?.message || error.message || "Failed";
    yield put(getMoreStocksFailure(errorMessage));
    if (error?.response?.status !== 401) {
     
    }
  }
}





export default function* rootSaga() {
  // @ts-ignore
  yield all([
    // ---- GET_STOCKS---- //
    takeEvery(GET_STOCKS, fetchStocks),
    // ---- GET_MORE_STOCKS---- //
    takeEvery(GET_MORE_STOCKS, fetchMoreStocks),
    
  ]);
}
