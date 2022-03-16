import {
  USER_PLAYER,
  SCORE_PLAYER,
} from './index';

const addplayers = (player) => ({
  type: USER_PLAYER,
  payload: player,
});

export const addScore = (score) => ({
  type: SCORE_PLAYER,
  payload: score,
});

export default addplayers;
