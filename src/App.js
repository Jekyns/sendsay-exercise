import React from 'react';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { setUser, deleteUser } from './store/user/actions';
import './App.css';
import LoginScreen from './components/Login/LoginScreen';

class App extends React.PureComponent {
  state = {};

  componentDidMount() {
    if (cookie.load('sendsay_session')) {
      const user = {
        login: cookie.load('login'),
        sublogin: cookie.load('sublogin'),
        session: cookie.load('sendsay_session'),
      };
      this.props.setUser(user);
    }
  }

  render() {
    return (
      <div className="App">
        {
          this.props.user.login ?
            <div>login</div> :
            <LoginScreen />
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
};

const enchancer = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default enchancer(App);
