import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class HeaderGame extends Component {
  state = {
    hash: '',
  }

  // estou com uma duvida, vou deixar anotado para nao esquecer: como faz mesmo para 'ativar'
  // essa function para poder converter esse md5 do gravatar kkkkkkkkk (acredito que tenha que usar o lifecycle)
  // converter md5 https://br.gravatar.com/site/implement/hash/
  // npm install crypto-js
  converteMd5ToHash = () => {
    const { email } = this.props;
    const emailTrim = email.trim(); // trim tira os espaços do começo e fim da string - neste caso o email
    const toLowerCaseEmail = emailTrim.toLowerCase();
    const convertedEmail = md5(toLowerCaseEmail).toString();
    this.setState({
      hash: convertedEmail,
    });
  }

  render() {
    const { hash } = this.state;

    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="profile"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">nome do jogador</p>
        {/* alterar nome do jogador dinamicamente */}
        <p data-testid="header-score">0</p>
        {/* alterar placar dinamicamente */}
      </header>
    );
  }
}

// ler o estado do Redux, neste caso o email para ser utilizado como hash
const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
});

HeaderGame.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(HeaderGame);
