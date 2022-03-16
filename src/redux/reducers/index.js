import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import reducerTimer from './reducerTimer';

const rootReducer = combineReducers({ player, token, reducerTimer });

export default rootReducer;
