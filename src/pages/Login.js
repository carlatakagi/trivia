import React, { Component } from 'react';
import logo from '../trivia.png';

class Login extends Component {
  state = {
    isDisabled: true,
    name: '',
    email: '',
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
              onClick={ this.validateLogin }
            >
              Play
            </button>
          </form>
        </header>

      </div>
    );
  }
}

export default Login;
