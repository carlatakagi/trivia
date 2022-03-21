import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Ranking.css';

class Ranking extends Component {
  handleClick = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div className="ranking-container">
        <div className="mount-ranking">
          <h2
            className="ranking-title"
            data-testid="ranking-title"
          >
            Ranking
          </h2>

          <button
            type="submit"
            data-testid="btn-go-home"
            onClick={ this.handleClick }
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
