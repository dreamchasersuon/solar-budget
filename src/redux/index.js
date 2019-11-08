import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { combineReducers } from 'redux';
import reducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import createSecureStore from 'redux-persist-expo-securestore';
const secureStore = createSecureStore();

const persistConfig = {
  key: 'root',
  storage: secureStore,
  whitelist: ['user', 'bill', 'target', 'rate', 'settings']
};

const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  /*
   *   To avoid misunderstanding
   *   between packages redux-persist and redux-starter-kit
   *   https://github.com/rt2zz/redux-persist/issues/988
   */
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST']
    }
  })
});
const persistor = persistStore(store);
export { store, persistor };
