import { combineReducers, createStore } from 'redux';

import { authReducer } from './reducers/authReducer';
import { modalReducer } from './reducers/modalReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
