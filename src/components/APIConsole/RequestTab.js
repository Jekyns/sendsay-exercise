import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

class RequestTab extends React.PureComponent {
  state = {
    openDropdown: false,
    copiedText: false,
  };

  toogleDropdown = () => {
    this.setState({ openDropdown: !this.state.openDropdown });
  }

  render() {
    const { actionName, requestJson, success, tabExecute, tabDelete } = this.props;
    const { openDropdown, copiedText } = this.state;
    return (
      <div className="requests__request">
        <div className="request__tab" onClick={this.toogleDropdown}>
          <div className="tab__success">
            <div className={`tab__success-lamp ${success ? 'success' : 'failed'}`}></div>
          </div>
          <div className={`tab__title ${copiedText ? 'copied-show' : 'copied-hide'}`}>
            <span className="tab__title-span">{actionName}</span>
          </div>
          <div className="tab__dropdown-icon">
            <div className="tab__dropdown-dots"></div>
          </div>
        </div>
        <div className={`tab__dropdown ${openDropdown ? 'open-dropdown' : ''}`}>
          <ul className="dropdown__list">
            <li className="dropdown__list-li" onClick={() => {
              tabExecute(requestJson);
              this.toogleDropdown();
            }}>
              <span className="dropdown__list-span">
                Выполнить
              </span>
            </li>
            <li className="dropdown__list-li dropdown__list-copy" onClick={() => {
              this.setState({ copiedText: true });
              this.toogleDropdown();
              setTimeout(() => {
                this.setState({ copiedText: false });
              }, 500);
              navigator.clipboard.writeText(requestJson);
            }}>
              <span className="dropdown__list-span">
                Скопировать
              </span>
            </li>
            <li className="dropdown__list-li dropdown__list-delete" onClick={() => {
              tabDelete(actionName);
              this.toogleDropdown();
            }}>
              <span className="dropdown__list-span dropdown-delete-span">
                Удалить
            </span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default RequestTab;

RequestTab.propTypes = {
  actionName: PropTypes.string.isRequired,
  requestJson: PropTypes.string,
  success: PropTypes.bool.isRequired,
  tabExecute: PropTypes.func.isRequired,
  tabDelete: PropTypes.func.isRequired,
};

RequestTab.defaultProps = {
  actionName: 'undefined',
  success: false,
};
