import React from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import Sendsay from 'sendsay-api';
import { connect } from 'react-redux';
import { deleteUser } from '../store/user/actions';
import logoutIcon from '../img/icons/logout.png';

function LogoutBtn(props) {
  const deleteUser = () => {
    props.deleteUser();
    cookie.remove('sendsay_session');
    const sendsay = new Sendsay({});
    sendsay.request({
      action: 'logout',
      session: cookie.load('sendsay_session'),
    });
  };

  return (
    <button className="logout" onClick={deleteUser}>
      <span className="logout-span">
        Выйти
        </span>
      <img alt="logout icon" className="logout-img" src={logoutIcon} />
    </button>
  );
}

const mapDispatchToProps = {
  deleteUser,
};

const enchancer = connect(
  undefined,
  mapDispatchToProps,
);

export default enchancer(LogoutBtn);

LogoutBtn.propTypes = {
  deleteUser: PropTypes.func.isRequired,
};
