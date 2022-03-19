import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderGame from '../components/HeaderGame';
import Button from '../components/Button';
// import buttonBackLogin from '../components/buttonBackLogin';

class Feedback extends Component {
state={
  feedBack: '',
}

componentDidMount() {
  this.feedbackMessenger();
}

feedbackMessenger = () => {
  const { assertions } = this.props;
  const NUMBER_LIMIT = 3;
  if (assertions < NUMBER_LIMIT) {
    this.setState({ feedBack: 'Could be better...' });
  }
  if (assertions >= NUMBER_LIMIT) {
    this.setState({ feedBack: 'Well Done!' });
  }
}

  handleClick = () => {
    console.log('cliquei');
    const { history } = this.props;
    history.push('/');
  };

  goPageRaking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const { feedBack } = this.state;
    return (
      <>
        <HeaderGame />
        <h2>Correct answers</h2>
        <div data-testid="feedback-total-question">{assertions}</div>
        <h2>Maximum score</h2>
        <div data-testid="feedback-total-score">
          { score }
        </div>

        {/* <buttonBackLogin dataTestid="btn-play-again" /> */}
        <div data-testid="feedback-text">{feedBack}</div>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Play Again!
        </button>
        <Button
          dataTestid="btn-ranking"
          name="Raking"
          nextQuestion={ this.goPageRaking }
        />
      </>
    );
  }
}
// desconstruir o state pra não ficar tão grande, tem como?
const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  score: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
