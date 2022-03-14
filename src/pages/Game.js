import React, { Component } from 'react';
import { func, string } from 'prop-types';
import { connect } from 'react-redux';
import HeaderGame from '../components/HeaderGame';
import requestQuestion from '../services/requestQuestion';
import requestToken from '../services/requestToken';
import addTokens from '../redux/actions/token';

class Game extends Component {
  state = {
    apiResult: [],
    numberQuestion: 0,
    question: [],
    correctQuestion: [],
    answer: [],
  }

  async componentDidMount() {
    await this.getQuestion();
    await this.nextQuestion();
  }

  nextQuestion = () => {
    const { apiResult, numberQuestion } = this.state;
    const select = apiResult[numberQuestion];
    this.setState({
      numberQuestion: numberQuestion + 1,
      question: select,
      answer: this.randomArray([...select.incorrect_answers, select.correct_answer]),
      correctQuestion: select.correct_answer,
    });
    this.removeBorder();
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

  addBorder = () => {
    const correctQuestion = document.querySelector('.correct-question');
    const incorrectQuestion = document.querySelectorAll('.incorrect-question');
    console.log('add');
    correctQuestion.classList.add('correct');
    incorrectQuestion.forEach((el) => el.classList.add('incorrect'));
  }

  removeBorder = () => {
    const correctQuestion = document.querySelector('.correct-question');
    const incorrectQuestion = document.querySelectorAll('.incorrect-question');
    console.log('remove');
    correctQuestion.classList.remove('correct');
    incorrectQuestion.forEach((el) => el.classList.remove('incorrect'));
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

const mapStateToProps = (state) => ({
  token: state.token,
});

Game.propTypes = {
  token: string.isRequired,
  dispatch: func.isRequired,
};

export default connect(mapStateToProps, null)(Game);
