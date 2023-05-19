import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeEmail } from '../actions/index';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }

  buttonOn = () => {
    const { email, password } = this.state;
    const minCharacters = 5;
    const emailCheck = /^\S+@\S+\.\S+$/;
    let checkButton = true;

    if (password.length > minCharacters
      && emailCheck.test(email)) {
      checkButton = false;
    }
    return checkButton;
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClick = () => {
    const { email } = this.state;
    const { onClickChange, history } = this.props;
    onClickChange(email);
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email:
          <input
            name="email"
            type="email"
            value={ email }
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            name="password"
            type="password"
            value={ password }
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          disabled={ this.buttonOn() }
          type="button"
          onClick={ this.onClick }
        >
          Entrar
        </button>
      </form>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onClickChange: (email) => dispatch(changeEmail(email)),
});

Login.propTypes = {
  onClickChange: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
