import { combineReducers } from 'redux';
import collectionsReducer from './collectionsSlice';

const rootReducer = combineReducers({
  collections: collectionsReducer,
});

export default rootReducer;
