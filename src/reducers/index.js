import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import talks from './talks';

let rootReducer = combineReducers({ talks, routing: routerReducer });

export default rootReducer;
