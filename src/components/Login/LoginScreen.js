import React from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import Sendsay from 'sendsay-api';
import { connect } from 'react-redux';
import InputLabel from './InputLabel';
import './style.css';
import logo from '../../img/logo.svg';
import Spinner from '../../img/icons/Spinner.gif';
import { setUser } from '../../store/user/actions';

class LoginScreen extends React.PureComponent {
  state = {
    login: '',
    sublogin: '',
    password: '',
    loginError: false,
    errorMessage: '',
    passwordError: false,
    submittingForm: false,
  };

  validateField = (regex, str) => {
    if (!str) return true;
    const checkStr = regex.exec(str);
    if (!checkStr) return false;
    return checkStr[0].length === str.length;
  }

  onChange = (e) => {
    const { name, value } = e.target;

    if (name === 'login') {
      this.setState({
        loginError: !this.validateField(/_*[a-z0-9A-Z]+_*[a-z0-9A-Z]*@*[a-zA-Z]*[.]*[a-z]*/g, value)
      });
    }

    if (name === 'password') {
      this.setState({
        passwordError: !this.validateField(/[^а-яА-Я]*/g, value)
      });
    }

    this.setState({
      [name]: value,
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { login, sublogin, password } = this.state;
    if (!login) {
      this.setState({ loginError: true });
    }
    if (!password) {
      this.setState({ passwordError: true });
    }
    if (login && password) {
      this.setState({ submittingForm: true, errorMessage: '' });
      const sendsay = new Sendsay();
      sendsay.request({
        action: 'login',
        login,
        sublogin,
        passwd: password,
      }).then((res) => {
        const user = {
          login: res.login,
          sublogin: res.sublogin,
          session: res.session,
        };
        cookie.save('sendsay_session', user.session);
        this.props.setUser({ ...user });
        this.setState({ submittingForm: false });
      }).catch((err) => {
        const customErr = { ...err };
        delete customErr.request;
        this.setState({
          errorMessage: JSON.stringify(customErr),
          submittingForm: false,
          password: '',
        });
      });
    }
  }

  render() {
    const {
      submittingForm,
      errorMessage,
      loginError,
      sublogin,
      passwordError,
      login,
      password
    } = this.state;
    const spanButtonClass = `submit__btn-span ${submittingForm ? 'hide-text' : null}`;
    const loaderButtonClass = `submit__btn-loader ${submittingForm ? 'show-loader' : null}`;
    const errorBoxClass = `head__error ${errorMessage ? 'show-error' : null}`;
    return (
      <div className="wrapper login-wrapper">
        <object
          className="wrapper__logo-svg"
          type="image/svg+xml"
          data={logo}>
        </object>
        <div className="wrapper__login">
          <form className="wrapper__login-form" onSubmit={this.onSubmit}>
            <div className="form__head">
              <div className="head__title">
                <h1 className="head__title-h1">API-консолька</h1>
              </div>
              <div className={errorBoxClass}>
                <div className="error__head">
                  <div className="error__head-face">
                    <div className="head__face-eye left-eye"></div>
                    <div className="head__face-eye right-eye"></div>
                    <div className="head__face-mouth"></div>
                  </div>

                  <span className="error__head-span">
                    Вход не вышел
                  </span>
                </div>
                <div className="error__message">
                  <span className="error__message-span">
                    {errorMessage}
                  </span>
                </div>
              </div>
            </div>
            <div className="form__inputs">
              <InputLabel onChange={this.onChange} error={loginError} value={login} name="login" title="Логин" required />
              <InputLabel onChange={this.onChange} value={sublogin} name="sublogin" title="Сублогин" />
              <InputLabel onChange={this.onChange} error={passwordError} value={password} name="password" title="Пароль" type="password" required />
            </div>
            <div className="form__submit">
              <button type="submit" className="form__submit-btn">
                <span className={spanButtonClass}>Войти</span>
                <img alt="spinner" className={loaderButtonClass} src={Spinner} />
              </button>
            </div>
          </form>
        </div>
        <a href="https://github.com/Jekyns/sendsay-exercise" className="wrapper__link">
          <span href="https://github.com/Jekyns/sendsay-exercise" className="wrapper__link-visible">@Jekyns</span>
          <span className="wrapper__link-typing">/sendsay-exercise</span>
        </a>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setUser,
};

const enchancer = connect(
  undefined,
  mapDispatchToProps,
);

export default enchancer(LoginScreen);

LoginScreen.propTypes = {
  setUser: PropTypes.func.isRequired,
};
