import React from 'react';
import InputLabel from './InputLabel';
import './style.css';
import logo from '../../img/logo6.svg'



class LoginScreen extends React.PureComponent {
  state = {};

  componentDidMount() {

  }

  render() {

    return (
      <div className="handler">
        <object
          className="handler__logo-svg"
          type="image/svg+xml"
          data={logo}>
        </object>
        <div className="handler__login">
          <form className="handler__login-form">
            <div className="form__head">
              <h1 className="form__head-h1">API-консолька</h1>
            </div>
            <div className="form__inputs">
              <InputLabel title="Логин" type="email" required />
              <InputLabel title="Сублогин" />
              <InputLabel title="Пароль" type="password" required />
            </div>
            <div className="form__submit">
              <button type="submit" className="form__submit-btn">Войти</button>

            </div>
          </form>
        </div>
        <div className="handler__link">
          <a href="https://github.com/Jekyns/sendsay-exercise" className="handler__link-a">@Jekyns</a>
        </div>
      </div>
    );
  }
}

export default LoginScreen;
