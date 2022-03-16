import { combineReducers } from 'redux';
import players from './player';
import token from './token';
import reducerTimer from './reducerTimer';

const rootReducer = combineReducers({ players, token, reducerTimer });

export default rootReducer;
