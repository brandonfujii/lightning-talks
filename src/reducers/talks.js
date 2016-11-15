import createReducer from './createReducer';
import * as types from '../constants';

function talks(state = [], action) {
  switch(action.type) {
    case 'SET_TALKS':
      return action.talks;
    default:
      return state;
  }
}

function isFetching(state, action) {
  switch(action.type) {
    case 'FETCHING_TALKS':
      return true;
    case 'RECEIVED_TALKS':
      return false;
    default:
      return state;
  }
}

export default talks;
