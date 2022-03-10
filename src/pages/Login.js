import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import requestToken from '../services/requestToken';
import logo from '../trivia.png';
import addTokens from '../redux/actions/token';

class Login extends Component {
  state = {
    isDisabled: true,
    name: '',
    email: '',
  }

  getAndSaveToken = async (event) => {
    event.preventDefault();
    const token = await requestToken();
    const resultToken = token.token;
    const saveStorage = (userToken) => localStorage.setItem('token', userToken);
    saveStorage(resultToken);
    const { dispatch } = this.props;
    dispatch(addTokens(resultToken));
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    },
    this.validateLogin());
  }

  validateLogin() {
    const { email, name } = this.state;
    const regexEmail = /\S+@\S+\.\S+/;

    if (regexEmail.test(email) && name.length > 0) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  render() {
    const { isDisabled, name, email } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />

          <form>
            <label htmlFor="name">
              Name
              <input
                type="text"
                data-testid="input-player-name"
                onChange={ this.handleChange }
                value={ name }
                name="name"
              />
            </label>

            <label htmlFor="email">
              Email
              <input
                type="email"
                data-testid="input-gravatar-email"
                onChange={ this.handleChange }
                value={ email }
                name="email"
              />
            </label>

            <button
              type="submit"
              data-testid="btn-play"
              disabled={ isDisabled }
              onClick={ this.getAndSaveToken }
            >
              Play
            </button>
          </form>
        </header>

      </div>
    );
  }
}

export default connect(null)(Login);

Login.propTypes = {
  dispatch: func.isRequired,
};
