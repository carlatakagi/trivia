import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Ranking.css';

class Ranking extends Component {
  state = {
    name: '',
    email: '',
    score: 0,
  }

  componentDidMount() {
    this.getStorages();
  }

  getStorages() {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('score');
    const score = localStorage.getItem('score');

    this.setState({
      name,
      email,
      score,
    });
  }

  handleClick = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { name, email, score } = this.state;
    return (
      <div className="ranking-container">
        <div className="mount-ranking">
          <h2
            className="ranking-title"
            data-testid="ranking-title"
          >
            Ranking
          </h2>
          <img
            src={ `https://www.gravatar.com/avatar/${email}` }
            alt="profile"
          />
          <p>{name}</p>
          <p>{score}</p>
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
