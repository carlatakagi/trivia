import React, { Component } from 'react';
import { func, string, number } from 'prop-types';
import { connect } from 'react-redux';
import HeaderGame from '../components/HeaderGame';
import requestQuestion from '../services/requestQuestion';
import requestToken from '../services/requestToken';
import addTokens from '../redux/actions/token';
import { addScore } from '../redux/actions/players';

class Game extends Component {
  state = {
    apiResult: [],
    numberQuestion: 0,
    question: [],
    correctQuestion: [],
    answer: [],
    score: 0,
    timer: 0,
  }

  async componentDidMount() {
    await this.getQuestion();
    this.nextQuestion();
  }

  nextQuestion = () => {
    const { apiResult, numberQuestion } = this.state;
    const select = apiResult[numberQuestion];
    // const { score } = getState();
    const getScoreStorage = localStorage.getItem('score');

    this.setState({
      numberQuestion: numberQuestion + 1,
      question: select,
      answer: this.randomArray([...select.incorrect_answers, select.correct_answer]),
      correctQuestion: select.correct_answer,
      score: getScoreStorage,
    });
    this.removeBorder();
    console.log(`valor score ${getScoreStorage}`);
  };

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
  }

  classQuestion = (item) => {
    const { correctQuestion } = this.state;
    const test = item === correctQuestion
      ? 'correct-question'
      : 'incorrect-question';
    return test;
  };

  addBorder = ({ target }) => {
    const correctQuestion = document.querySelector('.correct-question');
    const incorrectQuestion = document.querySelectorAll('.incorrect-question');

    correctQuestion.classList.add('correct');
    incorrectQuestion.forEach((el) => el.classList.add('incorrect'));
    this.calculateScore(target.classList[1]);
  }

  removeBorder = () => {
    const correctQuestion = document.querySelector('.correct-question');
    const incorrectQuestion = document.querySelectorAll('.incorrect-question');

    correctQuestion.classList.remove('correct');
    incorrectQuestion.forEach((el) => el.classList.remove('incorrect'));
  }

  // funcao para calcular a pontuacao
  // 10 + (timer * dificuldade)
  // hard: 3, medium: 2, easy: 1
  calculateScore = (classQuestion) => {
    const { question, timer = 0 } = this.state;
    let scorePoints = 0;
    const TEN = 10;
    const EASY = 1;
    const MEDIUM = 2;
    const HARD = 3;

    if (classQuestion === 'correct') {
      if (question.difficulty === 'hard') {
        scorePoints = Number(TEN + (timer * HARD));
      } if (question.difficulty === 'medium') {
        scorePoints = Number(TEN + (timer * MEDIUM));
      } if (question.difficulty === 'easy') {
        scorePoints = Number(TEN + (timer * EASY));
      }

      // sobrescreve o valor - nao passa no teste (teste invoca a funcao getState)
      return this.setState((previousState, currentState) => ({
        ...previousState,
        score: previousState.score + currentState.scorePoints,
      }), this.saveScore(scorePoints));
    }
  }

  // salva o score no storage
  saveScore = (score) => {
    const { dispatch } = this.props;

    const saveScoreToStorage = (scorePoints) => {
      localStorage.setItem('score', scorePoints);
    };
    console.log(score);

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
    const { question, answer } = this.state;

    return (
      <div>
        <HeaderGame />
        <h2 data-testid="question-category">{ question.category }</h2>
        <h3 data-testid="question-text">{question.question}</h3>
        <span data-testid="answer-options">
          {answer.map((item, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ this.correctQuestion(item) }
              className={ this.classQuestion(item) }
              onClick={ this.addBorder }
            >
              {item}
            </button>
          ))}
        </span>
        <button type="button" onClick={ this.nextQuestion }> Next </button>
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: func.isRequired,
  token: string.isRequired,
  scorePoints: number.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps, null)(Game);
