import React from 'react';
import './App.css';
import LoginScreen from './components/Login/LoginScreen';
import { setUser, deleteUser } from './store/user/actions';
import { connect } from 'react-redux';
import cookie from 'react-cookies'




class App extends React.PureComponent {
  state = {
  };

  componentDidMount() {
    if (cookie.load('sendsay_session')) {
      let user = {
        login: cookie.load('login'),
        sublogin: cookie.load('sublogin'),
        session: cookie.load('sendsay_session'),
      }
      this.props.setUser(user);
    }
  }

  render() {

    return (
      <div className="App">
        <LoginScreen />
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