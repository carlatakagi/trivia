const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'USER_PLAYER':
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  case 'SCORE_PLAYER':
    return {
      ...state,
      score: action.payload,
    };
  default:
    return state;
  }
};

export default player;
