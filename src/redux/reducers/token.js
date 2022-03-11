import { ADD_TOKEN } from '../actions/index';

const INITIAL_STATE = {
  token: '',
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_TOKEN:
    return action.token;
  default:
    return state;
  }
};

export default token;
