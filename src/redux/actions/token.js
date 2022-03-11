import {
  ADD_TOKEN,
} from './index';

const addTokens = (item) => ({
  type: ADD_TOKEN,
  token: item,
});

export default addTokens;
