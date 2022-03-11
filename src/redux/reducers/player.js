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
      name: action.payload,
      gravatarEmail: action.payload,
    };
  default:
    return state;
  }
};

export default player;
