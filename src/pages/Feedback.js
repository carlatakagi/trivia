import React, { Component } from 'react';
import HeaderGame from '../components/HeaderGame';

class Feedback extends Component {
  render() {
    return (
      <>
        <HeaderGame />
        <div data-testid="feedback-text">FEEDBACK</div>
      </>
    );
  }
}

export default Feedback;
