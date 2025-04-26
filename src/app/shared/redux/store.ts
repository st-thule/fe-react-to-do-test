import { combineReducers, createStore } from 'redux';

import { authReducer } from './reducers/authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
