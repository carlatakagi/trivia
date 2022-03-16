import React, { Component } from 'react';
import { func, string } from 'prop-types';
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
    timer: [],
    seconds: 30,
    isDisabled: false,
  };

  async componentDidMount() {
    await this.getQuestion();
    // await this.nextQuestion();
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
    const select = apiResult[numberQuestion];
    // const { score } = getState();
    const getScoreStorage = JSON.parse(localStorage.getItem('score'));

    clearInterval(this.cronometro);

    this.setState({
      numberQuestion: numberQuestion + 1,
      question: select,
      answer: this.randomArray([
        ...select.incorrect_answers,
        select.correct_answer,

      ]),
      correctQuestion: select.correct_answer,

      score: getScoreStorage,
    });
    this.removeBorder();
    console.log(`valor score ${getScoreStorage}`);

      isDisabled: false,
      seconds: 30,
    }, this.setInterval());
    // dispatch(actionTimer())
    this.removeBorder();
    // tem que voltar o disabled pra false - ok
    // resetar o second pra 30 - ok
    // startar um novo interval - ok
  };

 montarPrimeiraPergunta= () => {
   const { apiResult, numberQuestion } = this.state;
   const select = apiResult[numberQuestion];
   this.setState({ question: select,
     answer: this.randomArray([
       ...select.incorrect_answers,
       select.correct_answer,
     ]),
     correctQuestion: select.correct_answer });
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
    const { score, question, timer, numberQuestion } = this.state;
    let scorePoints = 0;
    const TEN = 10;
    const EASY = 1;
    const MEDIUM = 2;
    const HARD = 3;

    if (classQuestion === 'correct') {
      if (question.difficulty === 'hard') {
        scorePoints = Number(TEN + (timer[numberQuestion] * HARD));
      } if (question.difficulty === 'medium') {
        scorePoints = Number(TEN + (timer[numberQuestion] * MEDIUM));
      } if (question.difficulty === 'easy') {
        scorePoints = Number(TEN + (timer[numberQuestion] * EASY));
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
    console.log(this.props);
    // const { apiResult } = this.state;
    const { question, answer, seconds, isDisabled, score } = this.state;
    return (
      <div>
        <HeaderGame />
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

        <button type="button" onClick={ this.nextQuestion }>
          {' '}
          Next
          {' '}
        </button>
        <div>
          <h3>{seconds}</h3>
        </div>

      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  token: state.token,
  time: state.time,
});

Game.propTypes = {
  dispatch: func.isRequired,
  token: string.isRequired,
  // time: number.isRequired,
};


export default connect(mapStateToProps, null)(Game);
