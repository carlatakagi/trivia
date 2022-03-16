import React, { Component } from 'react';

import  from 'prop-types';

import PropTypes, { func, string, shape } from 'prop-types';

import { connect } from 'react-redux';
import HeaderGame from '../components/HeaderGame';
import requestQuestion from '../services/requestQuestion';
import requestToken from '../services/requestToken';
import addTokens from '../redux/actions/token';
import { addScore } from '../redux/actions/player';
import Button from '../components/Button';


class Game extends Component {
  state = {
    apiResult: [],
    numberQuestion: 0,
    question: [],
    correctQuestion: [],
    answer: [],
    score: 0,
    seconds: 30,
    isDisabled: false,
    nextDisabled: false,
  };

  async componentDidMount() {
    await this.getQuestion();
    await this.setInterval();
    await this.montarPrimeiraPergunta();
  }

  componentDidUpdate() {
    const TIME_LIMIT = 0;
    const { seconds, isDisabled } = this.state;
    if (seconds === TIME_LIMIT && !isDisabled) {
      this.disabledButton();
    }
  }

  disabledButton = () => {
    clearInterval(this.cronometro);
    this.setState({ isDisabled: true });
  }

  setInterval = () => {
    const ONE_SECOND = 1000;
    this.cronometro = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, ONE_SECOND);
  };

  nextQuestion = () => {
    const { apiResult, numberQuestion } = this.state;
    const { history } = this.props;
    const select = apiResult[numberQuestion];
    const getScoreStorage = JSON.stringify(localStorage.getItem('score'));
    clearInterval(this.cronometro);
    const NUMBER = 4;
    if (numberQuestion > NUMBER) {
      history.push('/feedback');
    } else {
      this.setState({
        numberQuestion: numberQuestion + 1,
        question: select,
        answer: this.randomArray([
          ...select.incorrect_answers,
          select.correct_answer,
        ]),
        correctQuestion: select.correct_answer,
        score: +getScoreStorage,
        isDisabled: false,
        seconds: 30,
      }, this.setInterval());
      this.removeBorder();
    }
  };

 montarPrimeiraPergunta= () => {
   const { apiResult, numberQuestion } = this.state;
   const select = apiResult[numberQuestion];
   this.setState({ question: select,
     answer: this.randomArray([
       ...select.incorrect_answers,
       select.correct_answer,
     ]),
     correctQuestion: select.correct_answer,
     numberQuestion: numberQuestion + 1 });
 }

  getQuestion = async () => {
    const { token, dispatch } = this.props;
    let responseQuestion = await requestQuestion(token);
    const NUMBER = 3;

    // o erro era que nao existe a chave results e o retorno era undefined
    if (responseQuestion.response_code === NUMBER) {
      const responseToken = await requestToken();

      dispatch(addTokens(responseToken.token));
      responseQuestion = await requestQuestion(responseToken.token);
    }

    this.setState({ apiResult: responseQuestion.results });
  };

  correctQuestion = (item) => {
    const { correctQuestion, numberQuestion } = this.state;
    const test = item === correctQuestion
      ? 'correct-answer'
      : `wrong-answer-${numberQuestion}`;
    return test;
    // chmar a função que desabilita o botão aqui.
  };

  classQuestion = (item) => {
    const { correctQuestion } = this.state;
    const test = item === correctQuestion ? 'correct-question' : 'incorrect-question';
    return test;
  };

  addBorder = ({ target }) => {
    const correctQuestion = document.querySelector('.correct-question');
    const incorrectQuestion = document.querySelectorAll('.incorrect-question');

    correctQuestion.classList.add('correct');
    incorrectQuestion.forEach((el) => el.classList.add('incorrect'));
    this.calculateScore(target.classList[1]);
    this.setState({ nextDisabled: true });
  };

  removeBorder = () => {
    const correctQuestion = document.querySelector('.correct-question');
    const incorrectQuestion = document.querySelectorAll('.incorrect-question');

    correctQuestion.classList.remove('correct');
    incorrectQuestion.forEach((el) => el.classList.remove('incorrect'));
  };
  // funcao para calcular a pontuacao
  // 10 + (timer * dificuldade)
  // hard: 3, medium: 2, easy: 1
  calculateScore = (classQuestion) => {
    const { score, question, seconds } = this.state;
    let scorePoints = 0;
    const TEN = 10;
    const EASY = 1;
    const MEDIUM = 2;
    const HARD = 3;

    if (classQuestion === 'correct') {
      if (question.difficulty === 'hard') {
        scorePoints = Number(TEN + (seconds * HARD));
      } if (question.difficulty === 'medium') {
        scorePoints = Number(TEN + (seconds * MEDIUM));
      } if (question.difficulty === 'easy') {
        scorePoints = Number(TEN + (seconds * EASY));
      }

      return this.setState(({
        score: score + scorePoints,
      }), this.saveScore(scorePoints));
    }
  }

  // salva o score no storage
  saveScore = (score) => {
    const { dispatch } = this.props;

    const saveScoreToStorage = (scorePoints) => {
      localStorage.setItem('score', scorePoints);
    };

    saveScoreToStorage(score);
    dispatch(addScore(score));
  }

  // Função para randomizar array
  randomArray(arr) {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 2));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  render() {
    const { question, answer, seconds, isDisabled, score, nextDisabled } = this.state;
    return (
      <div>
        <HeaderGame score={ score } />
        <h2 data-testid="question-category">{question.category}</h2>

        <h3 data-testid="question-text">{question.question}</h3>
        <span data-testid="answer-options">
          {answer.map((item, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ this.correctQuestion(item) }
              className={ this.classQuestion(item) }
              onClick={ this.addBorder }
              disabled={ isDisabled }
            >
              {item}
            </button>
          ))}
        </span>
        {nextDisabled && <Button nextQuestion={ this.nextQuestion } />}
        <div>
          <h3>{seconds}</h3>
        </div>

      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  token: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
  time: state.time,
});

Game.propTypes = {
  token: string.isRequired,
  dispatch: func.isRequired,
  history: shape({
    push: func.isRequired,
  }).isRequired,
  // time: number.isRequired,
};
export default connect(mapStateToProps, null)(Game);
