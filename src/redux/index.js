import { configureStore, combineReducers } from 'redux-starter-kit';
import reducers from './reducers';

const rootReducer = combineReducers(reducers);
export default configureStore({ reducer: rootReducer });
