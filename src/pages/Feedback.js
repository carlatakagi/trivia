import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderGame from '../components/HeaderGame';
// import buttonBackLogin from '../components/buttonBackLogin';

class Feedback extends Component {
state={
  ranking1: '',
  ranking2: '',
  ranking3: '',
}

  handleClick = () => {
    console.log('cliquei');
    const { history } = this.props;
    history.push('/');
  };

  render() {
    console.log(this.props);
    return (
      <>
        <HeaderGame />
        {/* <buttonBackLogin dataTestid="btn-play-again" /> */}

        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Play Again!
        </button>
      </>
    );
  }
}
Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Feedback);
// 13. Crie a mensagem de feedback para ser exibida a pessoa usuária
// PRIORIDADE 1 - A tela de feedback deve exibir uma mensagem relacionada ao desempenho da pessoa que jogou

// Observações técnicas

// A mensagem deve ser "Could be better..." caso a pessoa acerte menos de 3 perguntas
// A mensagem deve ser "Well Done!" caso a pessoa acerte 3 perguntas ou mais
// O elemento da mensagem de feedback deve possuir o atributo data-testid com o valor feedback-text
// O que será avaliado

// Será validado se ao acertar menos de 3 perguntas a mensagem de feedback é "Could be better..."
// Será validado se ao acertar 3 perguntas a mensagem de feedback é "Well Done!"
// Será validado se ao acertar mais de 3 perguntas a mensagem de feedback é "Well Done!"
