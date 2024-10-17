import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  GET_STOCKS,
} from "../../../../constants/actionTypes";
import {
  getStocksRequest,
} from "../services";
import { getStocksFailure, getStocksSuccess } from "../actions";
import { handleErrorAlert } from "../../../../constants/commonFunctions";




function* fetchStocks(data: any) {
  const {
    payload: { search },
  } = data;
  try {
    // @ts-ignore
    const response = yield call(getStocksRequest, { search });
    const data = response.data;
    yield put(getStocksSuccess(data));
  } catch (error: any) {
    yield put(getStocksFailure(error?.response?.data?.message));
    if (error?.response?.status !== 401) {
      handleErrorAlert({
        errorTitle: "Failed",
        errorMessage: error?.response?.data?.message || "Failed",
      });
    }
  }
}





export default function* rootSaga() {
  // @ts-ignore
  yield all([
    // ---- GET_STOCKS---- //
    takeEvery(GET_STOCKS, fetchStocks),
    
  ]);
}
