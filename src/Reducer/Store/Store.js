import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import RootReducer from "./Index";
import RootSaga from "../../Saga/Index";


const sagaMiddleware = createSagaMiddleware();

const Store = createStore(RootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(RootSaga)

export default Store;