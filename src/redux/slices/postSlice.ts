import { createSlice } from '@reduxjs/toolkit';
import { PostConfig } from '../../utils/types';

interface PostState {
  postList: PostConfig[];
  selectedPostConfig: PostConfig;
  selectedPostHtml: string;
}

const initialState: PostState = {
  postList: [],
  selectedPostConfig: {} as PostConfig,
  selectedPostHtml: '',
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    savePostList: (state, action) => {
      state.postList = action.payload ?? state.postList;
    },
    clearPostList: state => {
      state.postList = [];
    },
    saveSelectedPostConfig: (state, action) => {
      state.selectedPostConfig = action.payload;
    },
    clearSelectedPostConfig: state => {
      state.selectedPostConfig = {} as PostConfig;
    },
    saveSelectedPostHtml: (state, action) => {
      state.selectedPostHtml = action.payload;
    },
    clearSelectedPostHtml: state => {
      state.selectedPostHtml = '';
    },
  },
});

export const {
  savePostList,
  clearPostList,
  saveSelectedPostConfig,
  clearSelectedPostConfig,
  saveSelectedPostHtml,
  clearSelectedPostHtml,
} = postSlice.actions;
export default postSlice.reducer;
