import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class HeaderGame extends Component {
  state = {
    hash: '',
  }

  componentDidMount = () => {
    this.converteMd5ToHash();
  }

  // converter md5 https://br.gravatar.com/site/implement/hash/
  // npm install crypto-js
  converteMd5ToHash = () => {
    const { email } = this.props;
    console.log(email);
    const convertedEmail = md5(email).toString();
    this.setState({
      hash: convertedEmail,
    });
  }

  render() {
    const { hash } = this.state;
    const { name } = this.props;

    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="profile"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">0</p>
        {/* alterar placar dinamicamente */}
      </header>
    );
  }
}

// ler o estado do Redux, neste caso o nome do jogador e o email para ser utilizado como hash
const mapStateToProps = (state) => ({
  email: state.players.player.email,
  name: state.players.player.name,
});

HeaderGame.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(HeaderGame);
