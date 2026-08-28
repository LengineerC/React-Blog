import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import watchRoot from './sagas/watchRoot';
import uiReducer from './slices/uiSlice';
import postReducer from './slices/postSlice';
import taxonomyReducer from './slices/taxonomySlice';
import appReducer from './slices/appSlice';
import { Categories, FriendUrl, PostConfig, Tags } from '../utils/types';
import { SITE_DEFAULT_THEME_MODE } from '../utils/constants';

export type StoreBootstrapData = {
  posts: PostConfig[];
  tags: Tags;
  categories: Categories;
  friends: FriendUrl[];
};

export function createAppStore(bootstrapData?: StoreBootstrapData) {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
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
    devTools: import.meta.env.DEV,
    preloadedState: bootstrapData
      ? {
          ui: {
            navState: true,
            darkMode: SITE_DEFAULT_THEME_MODE,
          },
          post: {
            postList: bootstrapData.posts,
          },
          taxonomy: {
            tagsList: bootstrapData.tags,
            categoriesList: bootstrapData.categories,
          },
          app: {
            aplayer: {},
            friendsUrlData: bootstrapData.friends,
            githubRepoCommits: [],
          },
        }
      : undefined,
  });

  if (typeof window !== 'undefined') sagaMiddleware.run(watchRoot);

  return store;
}

export const store = createAppStore();
export type AppStore = ReturnType<typeof createAppStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export default store;
