import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Button extends Component {
  render() {
    const { nextQuestion, name, dataTestid } = this.props;
    return (
      <div>
        <button
          data-testid={ dataTestid }
          type="button"
          onClick={ nextQuestion }
        >
          {name}
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  nextQuestion: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
};

export default Button;
