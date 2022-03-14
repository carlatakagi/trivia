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
  }

  componentDidMount() {
    this.getQuestion();
  }

  nextQuestion = () => {
    const { apiResult, numberQuestion } = this.state;
    const select = apiResult[numberQuestion];
    this.setState({ numberQuestion: numberQuestion + 1 });
    console.log(apiResult, select);
  };

  /* getQuestion = async () => {
    const { token, dispatch } = this.props;
    const result = await requestQuestion(token);
    const NUMBER = 3;
    if (result.response_code === NUMBER) {
      const { results } = await requestToken();
      dispatch(addTokens(results));
    }
    this.setState({ apiResult: result.results });
  }; */

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

  render() {
    const { apiResult } = this.state;
    console.log(apiResult);
    return (
      <div>
        <HeaderGame />

        <div>
          {apiResult.map((answer, index) => (
            <div key="answer">
              <h2 data-testid="question-category">{ answer.category }</h2>
              <h3 data-testid="question-text">{answer.question}</h3>

              <button
                type="button"
                data-testid={ `wrong-answer-${index}` }
              >
                {answer.incorrect_answers}
              </button>
            </div>
          ))}
          ;
        </div>

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
