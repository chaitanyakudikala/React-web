import { fork } from "redux-saga/effects";
import { allListItems } from "./store/sagas/listItemSaga";

export function* rootSaga() {
  yield fork(allListItems);
}
