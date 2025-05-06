import { combineReducers, createStore } from 'redux';

import { modalReducer } from './reducers/modalReducer';

const rootReducer = combineReducers({
  modal: modalReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
