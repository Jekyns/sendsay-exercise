import React from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import Sendsay from 'sendsay-api';
import { connect } from 'react-redux';
import { setUser, deleteUser } from '../store/user/actions';
import logoutIcon from '../img/icons/logout.png';

class LogoutBtn extends React.PureComponent {
  deleteUser = () => {
    this.props.deleteUser();
    cookie.remove('sendsay_session');
    const sendsay = new Sendsay({});
    sendsay.request({
      action: 'logout',
      session: cookie.load('sendsay_session'),
    });
  }

  render() {
    return (
      <button className="logout" onClick={this.deleteUser}>
        <span className="logout-span">
          Выйти
        </span>
        <img alt="logout icon" className="logout-img" src={logoutIcon}/>
      </button>
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

export default enchancer(LogoutBtn);

LogoutBtn.propTypes = {
  deleteUser: PropTypes.func.isRequired,
};
