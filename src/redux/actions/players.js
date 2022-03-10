import {
  USER_PLAYER,
} from './index';

const players = (player) => ({
  type: USER_PLAYER,
  payload: player,
});

export default players;
