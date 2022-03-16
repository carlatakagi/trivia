import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Button extends Component {
  render() {
    const { nextQuestion } = this.props;
    return (
      <div>
        <button
          data-testid="btn-next"
          type="button"
          onClick={ nextQuestion }
        >
          Next
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  nextQuestion: PropTypes.func.isRequired,
};

export default Button;
