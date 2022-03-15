import { PLAY_TIMER } from './index';

const actionTimer = (time) => ({
  type: PLAY_TIMER,
  payload: time,
});

export default actionTimer;
