import React, { Component } from 'react';
import HeaderGame from '../components/HeaderGame';
import requestQuestion from '../services/requestQuestion';

class Game extends Component {
  render() {
    return (
      <div>
        <HeaderGame />
      </div>
    );
  }
}

export default Game;
