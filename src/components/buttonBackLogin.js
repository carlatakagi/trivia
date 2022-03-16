import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class buttonBackLogin extends Component {
    handleClick = () => {
      const { history } = this.props;
      history.push('/');
    }

    render() {
      const { id, name, dataTestId } = this.props;
      return (
        <button
          id={ id }
          type="button"
          name={ name }
          onClick={ this.handleClick }
          data-testid={ dataTestId }
        >
          Play Again!!!
        </button>
      );
    }
}
buttonBackLogin.defaultProps = {
  dataTestId: '',
};

buttonBackLogin.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  dataTestId: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
