import { put, call, takeEvery } from 'redux-saga/effects';
// import { GetRepoCommitsPayload } from "../../services/githubService/type";
import { getRepoCommits } from '../../services/githubService/githubService';
import { message } from 'antd';
import { saveGithubRepoCommits } from '../slices/appSlice';

// interface GetGithubRepoCommitsAction{
//     type:string,
//     payload:GetRepoCommitsPayload,
//     callback?:Function
// }

function* getGithubRepoCommits(action) {
  const { payload, callback } = action;
  const response = yield call(getRepoCommits, payload);
  // console.log(response);
  const { status, data } = response;
  if (status === 200) {
    yield put(saveGithubRepoCommits(data));

    if (typeof callback === 'function') {
      callback(data);
    }
  } else {
    message.error('Fetch Error!');
  }
}
export function* watchGetGithubRepoCommits() {
  yield takeEvery('getGithubRepoCommits', getGithubRepoCommits);
}
