import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderGame from '../components/HeaderGame';
// import buttonBackLogin from '../components/buttonBackLogin';

class Feedback extends Component {
state={
  feedBack: '',
}

componentDidMount() {
  this.feedbackMessenger();
}

feedbackMessenger = () => {
  const { assertion } = this.props;
  const NUMBER_LIMIT = 3;
  if (assertion < NUMBER_LIMIT) {
    this.setState({ feedBack: 'Could be better...' });
  }
  if (assertion >= NUMBER_LIMIT) {
    this.setState({ feedBack: 'Well Done!' });
  }
}

  handleClick = () => {
    console.log('cliquei');
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { feedBack } = this.state;
    return (
      <>
        <HeaderGame />

        {/* <buttonBackLogin dataTestid="btn-play-again" /> */}
        <div>{feedBack}</div>
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
// desconstruir o state pra não ficar tão grande, tem como?
const mapStateToProps = (state) => ({
  assertion: state.players.player.assertions,
});

Feedback.propTypes = {
  assertion: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
