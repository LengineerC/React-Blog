import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import watchRoot from './sagas/watchRoot';
import uiReducer from './slices/uiSlice';
import postReducer from './slices/postSlice';
import taxonomyReducer from './slices/taxonomySlice';
import appReducer from './slices/appSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    post: postReducer,
    taxonomy: taxonomyReducer,
    app: appReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(watchRoot);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
