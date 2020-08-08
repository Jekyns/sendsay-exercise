import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../img/small_logo.svg';
import LogoutBtn from './LogoutBtn';

function Header(props) {
  const { user, toogleFullScreen, isFullscreen } = props;
  return (
    <div className="header">
      <div className="header__left">
        <div className="header__left-logo">
          <object
            className="header__logo-svg"
            type="image/svg+xml"
            data={logo}>
          </object>
        </div>
        <div className="header__left-name">
          <span className="header__left-span">
            API-консолька
            </span>
        </div>
      </div>
      <div className="header__right">
        <div className="header__right-item header__right-user">
          <span className="user-item header__right-login">
            {user.login}
          </span>
          {user.login === user.sublogin ? '' :
            <span className="user-item header__right-sublogin">
              {user.sublogin}
            </span>
          }
        </div>
        <div className="header__right-item header__right-logout">
          <LogoutBtn />
        </div>
        <div className="header__right-item right__fullscreen">
          <button className="right__fullscreen-button"
            onClick={toogleFullScreen}
          >
            {
              isFullscreen ? (
                <svg className="right__fullscreen-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 6H4C4.53043 6 5.03914 5.78929 5.41421 5.41421C5.78929 5.03914 6 4.53043 6 4V1M14 1V4C14 4.53043 14.2107 5.03914 14.5858 5.41421C14.9609 5.78929 15.4696 6 16 6H19M19 14H16C15.4696 14 14.9609 14.2107 14.5858 14.5858C14.2107 14.9609 14 15.4696 14 16V19M6 19V16C6 15.4696 5.78929 14.9609 5.41421 14.5858C5.03914 14.2107 4.53043 14 4 14H1"
                    stroke="#0D0D0D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="right__fullscreen-icon-path"
                  />
                </svg>

              ) : (
                  <svg className="right__fullscreen-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V6M19 6V3C19 2.46957 18.7893 1.96086 18.4142 1.58579C18.0391 1.21071 17.5304 1 17 1H14M14 19H17C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V14M1 14V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19H6"
                      stroke="#0D0D0D"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="right__fullscreen-icon-path"
                    />
                  </svg>)
            }
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userStore.user,
  };
};

const enchancer = connect(
  mapStateToProps,
  undefined,
);

export default enchancer(Header);

Header.propTypes = {
  user: PropTypes.object.isRequired,
  isFullscreen: PropTypes.bool.isRequired,
  toogleFullScreen: PropTypes.func.isRequired,
};
