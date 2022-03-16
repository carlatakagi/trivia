const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: '',
    gravatarEmail: '',
  },
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'USER_PLAYER':
    return {
      ...state,
      player: action.payload,
    };
  case 'SCORE_PLAYER':
    return {
      ...state,
      player: { ...state.player,
        score: state.score + action.payload },
    };
  default:
    return state;
  }
};

export default player;
