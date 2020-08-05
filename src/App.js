import React from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import Sendsay from 'sendsay-api';
import { setUser, deleteUser } from './store/user/actions';
import { addRequest, setHistory } from './store/requestHistory/actions';
import LoginScreen from './components/Login/LoginScreen';
import APIConsole from './components/APIConsole/APIConsole';
import './App.css';

class App extends React.PureComponent {
  state = {
    loading: false,
  };

  async componentDidMount() {
    if (cookie.load('history')) {
      const { setHistory } = this.props;
      setHistory(cookie.load('history'));
    }
    if (cookie.load('sendsay_session')) {
      this.setState({ loading: true });
      const sendsay = new Sendsay({});
      try {
        const checkAuth = await sendsay.request({
          action: 'pong',
          session: cookie.load('sendsay_session'),
        });
        const user = {
          login: checkAuth.account,
          sublogin: checkAuth.sublogin,
        };
        this.props.setUser(user);
        this.setState({ loading: false });
      } catch (err) {
        this.setState({ loading: false });
        console.log('authentication error', JSON.stringify(err));
      }
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="App">
        {loading ? (
          <div className="App__logo">
            <div className="App__logo-circle"></div>
            <div className="App__logo-square"></div>
            <div className="App__logo-circle"></div>
            <svg className="App__logo-parallelogram" width="120" height="120" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 0H30L15 30H0L15 0Z" fill="black" fillOpacity="0.2"></path>
            </svg>
          </div>
        )
          :
          (
            this.props.user.login ?
              <APIConsole /> :
              <LoginScreen />
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userStore.user,
  };
};
const mapDispatchToProps = {
  setUser,
  deleteUser,
  addRequest,
  setHistory
};

const enchancer = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default enchancer(App);

App.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
  setHistory: PropTypes.func.isRequired,
};
