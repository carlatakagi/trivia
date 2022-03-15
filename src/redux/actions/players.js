import {
  USER_PLAYER,
} from './index';

const addplayers = (player) => ({
  type: USER_PLAYER,
  payload: player,
});

export default addplayers;
