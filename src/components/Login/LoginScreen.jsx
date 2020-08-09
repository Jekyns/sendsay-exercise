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

function LoginScreen(props) {
  const [login, setLogin] = React.useState('');
  const [sublogin, setSublogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loginError, setLoginError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [submittingForm, setSubmittingForm] = React.useState(false);
  const validateField = (regex, str) => {
    if (!str) return true;
    const checkStr = regex.exec(str);
    if (!checkStr) return false;
    return checkStr[0].length === str.length;
  }
  const onChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'login':
        setLogin(value);
        setLoginError(!validateField(/_*[a-z0-9A-Z]+_*[a-z0-9A-Z]*@*[a-zA-Z]*[.]*[a-z]*/g, value));
        break;
      case 'sublogin':
        setSublogin(value);
        break;
      case 'password':
        setPassword(value);
        setPasswordError(!validateField(/[^а-яА-Я]*/g, value));
        break;
      default:
        break;
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!login) {
      setLoginError(true);
    }
    if (!password) {
      setPasswordError(true);
      return null;
    }

    if (loginError || passwordError) {
      return null;
    }

    if (login && password) {
      setSubmittingForm(true);
      const sendsay = new Sendsay();
      try {
        const user = await sendsay.request({
          action: 'login',
          login,
          sublogin,
          passwd: password,
        });
        cookie.save('sendsay_session', user.session);
        props.setUser({
          login: user.login,
          sublogin: user.sublogin,
          session: user.session,
        });
      }
      catch (err) {
        const customErr = { ...err };
        delete customErr.request;
        setErrorMessage(JSON.stringify(customErr));
        setPassword('');
      }
      setSubmittingForm(false);
    }
  }
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
        <form className="wrapper__login-form" onSubmit={onSubmit}>
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
            <InputLabel onChange={onChange} error={loginError} value={login} name="login" title="Логин" required />
            <InputLabel onChange={onChange} value={sublogin} name="sublogin" title="Сублогин" />
            <InputLabel onChange={onChange} error={passwordError} value={password} name="password" title="Пароль" type="password" required />
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
