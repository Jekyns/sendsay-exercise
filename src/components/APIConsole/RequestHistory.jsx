import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RequestTab from './RequestTab';
import './style.css';

function RequestHistory(props) {
  const requestHistoryRef = React.createRef();
  const [historyPosition, setHistoryPosition] = React.useState(0);

  const scrollRequestHistory = (e) => {
    const clientWidth = requestHistoryRef.current.clientWidth;
    if (e.deltaY > 0) {
      if (window.innerWidth + historyPosition >= clientWidth) {
        return null;
      }
    } else if (historyPosition <= 0) {
      return null;
    }
    if ((window.innerWidth + historyPosition + e.deltaY * 0.5) > clientWidth) {
      setHistoryPosition(clientWidth - window.innerWidth );
      return null;
    }
    if ((historyPosition + e.deltaY * 0.5) < 0) {
      setHistoryPosition(0);
      return null;
    }
    setHistoryPosition(historyPosition + e.deltaY * 0.5);//  e.deltaY=-100 or 100
    return null;
  }

  const showRequestTabs = () => {
    const { requests, tabExecute, tabDelete } = props;
    const tabs = [];
    requests.forEach(request => {
      tabs.push(
        <RequestTab
          actionName={request.actionName}
          requestJson={request.requestJson}
          success={request.success}
          tabExecute={tabExecute}
          tabDelete={tabDelete}
          key={request.actionName}
        />
      );
    });
    return tabs;
  }

  const { hide, clearHistory } = props;
  const moveHistory = {
    right: `${historyPosition}px`
  };

  return (
    <div className={`history ${hide ? 'hide-history' : ''}`} onWheel={scrollRequestHistory}>
      <div className="history__requests" style={moveHistory} ref={requestHistoryRef}>
        {showRequestTabs()}
      </div>
      <div className="history__clear" onClick={clearHistory}>

      </div>
    </div>
  );
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
  requests: PropTypes.arrayOf(PropTypes.object),
  tabExecute: PropTypes.func.isRequired,
  tabDelete: PropTypes.func.isRequired,
};

RequestHistory.defaultProps = {
  hide: true,
};
