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

  getQuestion = async () => {
    const { token, dispatch } = this.props;
    const result = await requestQuestion(token);
    const NUMBER = 3;
    if (result.response_code === NUMBER) {
      const { results } = await requestToken();
      dispatch(addTokens(results));
    }
    this.setState({ apiResult: result.results });
  };

  render() {
    const { apiResult } = this.state;
    return (
      <div>
        <p>
          {/* {apiResult.map((el) => {

          })} */}
          ;
        </p>
        <button type="button" onClick={ this.nextQuestion }> Next </button>
        <HeaderGame />
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
