import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import authReducer from "./reducer";
import mySaga from "./sagas";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ authReducer });
const persistConfig = {
  key: "root",
  storage: storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
);
const persistor = persistStore(store);
sagaMiddleware.run(mySaga);
export {persistor};
export default store;