import { combineReducers } from 'redux';
import players from './player';
import token from './token';

const rootReducer = combineReducers({ players, token });

export default rootReducer;
