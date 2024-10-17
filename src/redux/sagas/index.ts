import { all } from "redux-saga/effects";
import homeSaga from "../../modules/home/data/sagas/index";

export default function* rootSaga() {
  yield all([
    homeSaga(),
  ]);
}
