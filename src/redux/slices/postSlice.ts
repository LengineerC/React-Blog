import { createSlice } from '@reduxjs/toolkit';
import { PostConfig } from '../../utils/types';

interface PostState {
  postList: PostConfig[];
}

const initialState: PostState = {
  postList: [],
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
  },
});

export const { savePostList, clearPostList } = postSlice.actions;
export default postSlice.reducer;
