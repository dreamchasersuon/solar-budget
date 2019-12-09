import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import reducers from "./reducers";
import thunk from "redux-thunk";
import createSecureStore from "redux-persist-expo-securestore";

const storage = createSecureStore();

const config = {
  key: "root",
  storage,
  blacklist: ["navigation"]
};

const reducer = persistCombineReducers(config, reducers);

const rootReducer = (state, action) => reducer(state, action);

const middleware = [thunk];

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(...middleware))
);

const persistor = persistStore(store, null);

export { persistor, store };
