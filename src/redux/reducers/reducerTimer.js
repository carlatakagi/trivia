const INITIAL_STATE = {

  timer: '',
};

const reducerTimer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'PLAY_TIMER':
    return {
      ...state,
      timer: action.payload,
    };
  default:
    return state;
  }
};

export default reducerTimer;

// não pode ser feito no game? temque ser componetizado?
// como fazer pra reiniciar o cronometro no clique do botão next
// como faz pra parar o cronometro quando clica no botão da resposta ?
// ao responder a pergunta o timer tem que parar e e ir pro estado geral?
