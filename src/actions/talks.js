import Api from './Api';
import * as types from '../constants';

export function fetchTalks() {
  return (dispatch, getState) => {
    Api.get('api/talks').then(res => {
      dispatch(setTalks({ talks: res }));
    }).catch((exception) => {
      console.log(exception);
    });
  }
}

export function upvoteTalk(talkId, userId) {
  return (dispatch, getState) => {
    dispatch({ type: types.FETCHING_TALKS });
    Api.post(`api/talks/${talkId}/upvote`, { userId: userId }).then(res => {
      dispatch(setTalks({ talks: res }));
      dispatch({ type: types.RECEIVED_TALKS });
    }).catch((exception) => {
      console.log(exception);
    });
  }
}

export function postTalk(talk) {
  return (dispatch, getState) => {
    Api.post('api/talks', talk).then(res => {
      dispatch(setTalks({ talks: res }));
    }).catch((exception) => {
      console.log(exception);
    });
  }
}

export function deleteTalk(talkId, userId) {
  return (dispatch, getState) => {
    Api.delete(`api/talks/${talkId}`, {userId: userId}).then(res => {
      dispatch(setTalks({ talks: res }))
    }).catch((exception) => {
      console.log(exception);
    });
  }
}

export function setTalks({ talks }) {
  return {
    type: types.SET_TALKS,
    talks
  }
}
