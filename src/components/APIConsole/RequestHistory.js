import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RequestTab from './RequestTab';
import './style.css';

class RequestHistory extends React.PureComponent {
  constructor(props) {
    super(props);
    this.requestHistoryRef = React.createRef();
  }

  state = {
    historyPosition: 0,
  };

  scrollRequestHistory = (e) => {
    const { historyPosition } = this.state;
    const clientWidth = this.requestHistoryRef.current.clientWidth;
    if (e.deltaY > 0) {
      if (window.innerWidth + historyPosition >= clientWidth) {
        return null;
      }
    } else if (historyPosition <= 0) {
      return null;
    }
    if ((window.innerWidth + historyPosition + e.deltaY * 0.5) > clientWidth) {
      this.setState({ historyPosition: clientWidth - window.innerWidth });
      return null;
    }
    if ((historyPosition + e.deltaY * 0.5) < 0) {
      this.setState({ historyPosition: 0 });
      return null;
    }
    this.setState({ historyPosition: historyPosition + e.deltaY * 0.5 });//  e.deltaY=-100 or 100
    return null;
  }

  showRequestTabs = () => {
    const { requests, tabExecute, tabDelete } = this.props;
    const tabs = [];
    requests.forEach(request => {
      tabs.push(
        <RequestTab
          actionName={request.actionName}
          requestJson={request.requestJson}
          success={request.success}
          tabExecute={tabExecute}
          tabDelete={tabDelete}
        />
      );
    });
    return tabs;
  }

  render() {
    const { hide, clearHistory } = this.props;
    const { historyPosition } = this.state;
    const moveHistory = {
      right: `${historyPosition}px`
    };
    return (
      <div className={`history ${hide ? 'hide-history' : ''}`} onWheel={this.scrollRequestHistory}>
        <div className="history__requests" style={moveHistory} ref={this.requestHistoryRef}>
          {this.showRequestTabs()}
        </div>
        <div className="history__clear" onClick={clearHistory}>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    requests: state.historyStore.requests,
  };
};

const enchancer = connect(
  mapStateToProps,
  undefined,
);

export default enchancer(RequestHistory);

RequestHistory.propTypes = {
  hide: PropTypes.bool.isRequired,
  clearHistory: PropTypes.func,
  requests: PropTypes.arrayOf(PropTypes.func),
  tabExecute: PropTypes.func.isRequired,
  tabDelete: PropTypes.func.isRequired,
};

RequestHistory.defaultProps = {
  hide: true,
};
