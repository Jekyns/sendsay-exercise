import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Sendsay from 'sendsay-api';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import { setUser, deleteUser } from '../../store/user/actions';
import Header from '../Header';
import RequestHistory from './RequestHistory';
import RequestArea from './RequestArea';
import Footer from './Footer';
import { addRequest, deleteRequest, setHistory } from '../../store/requestHistory/actions';
import './style.css';

function APIConsole(props) {
  const fullscreenRef = React.createRef();

  const [requestBoxWidth, setRequestBoxWidth] = React.useState(50);
  const [responseBoxWidth, setResponseBoxWidth] = React.useState(50);
  const [startCursorPosition, setStartCursorPosition] = React.useState(0);
  const [clicked, setClicked] = React.useState(false);
  const [requestText, setRequestText] = React.useState('');
  const [responseText, setResponseText] = React.useState('');
  const [requestError, setRequestError] = React.useState(false);
  const [responseError, setResponseError] = React.useState(false);
  const [fullscreen, setFullScreen] = React.useState(false);

  const IsJsonString = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (cookie.load('splitter-position')) {
      const splitterPosition = cookie.load('splitter-position');
      setRequestBoxWidth(splitterPosition.requestBoxWidth);
      setResponseBoxWidth(splitterPosition.responseBoxWidth);
    }
  }, [])

  const onChange = (e) => {
    const { value } = e.target;
    setRequestText(value);
    setRequestError(value.length > 0 ? !IsJsonString(value) : false);
  }

  const beautifyJson = (str) => {
    return JSON.stringify(JSON.parse(str), null, 2);
  }


  const sendRequest = async request => {
    setResponseError(false);
    if (requestError) {
      return null;
    }
    const sendsay = new Sendsay({});
    const requestBody = request || requestText;
    const requestJson = JSON.parse(requestBody);
    sendsay.request({
      session: cookie.load('sendsay_session'),
      ...requestJson,
    }).then((res) => {
      props.addRequest({
        actionName: requestJson.action,
        requestJson: beautifyJson(requestBody),
        success: true,
      });
      setRequestText(requestBody);
      setResponseText(beautifyJson(JSON.stringify(res)));
    }).catch((err) => {
      props.addRequest({
        actionName: requestJson.action,
        requestJson: beautifyJson(requestBody),
        success: false,
      });
      setRequestText(requestBody);
      setResponseText(beautifyJson(JSON.stringify(err)));
      setResponseError(true);
    });
    return null;
  }

  const moveSplitter = (e) => {
    if (!clicked) {
      return false;
    }
    e.preventDefault();
    const newSplitterPosition = startCursorPosition - e.clientX;
    setRequestBoxWidth(requestBoxWidth - newSplitterPosition / (window.innerWidth / 100));
    setResponseBoxWidth(responseBoxWidth + newSplitterPosition / (window.innerWidth / 100));
    setStartCursorPosition(e.clientX);
    return true;
  }

  const StartCursorMoving = (e) => {
    setStartCursorPosition(e.clientX);
    setClicked(true);
    setFullScreen(false);
  }

  const toogleFullScreen = () => {
    if (fullscreen) {
      document.exitFullscreen();
    } else {
      fullscreenRef.current.requestFullscreen();
    }
  }

  const formatRequestText = () => {
    setRequestText(beautifyJson(requestText));
  }

  const tabExecute = (request) => {
    sendRequest(request);
  }

  const tabDelete = (actionName) => {
    const { deleteRequest } = props;
    deleteRequest(actionName);
  }

  const clearHistory = () => {
    const { setHistory } = props;
    setHistory([]);
    cookie.remove('history');
  }

  const savePosition = () => {
    const splitterPosition = {
      requestBoxWidth,
      responseBoxWidth,
    };
    cookie.save(
      'splitter-position',
      JSON.stringify(splitterPosition),
      {
        maxAge: 1000,
      }
    );
  }

  const { requests } = props;

  const splitterClass = {
    width: clicked ? '25px' : '15px',
  };

  document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
      setFullScreen(true);
    } else {
      setFullScreen(false);
    }
  });

  return (
    <div className="wrapper" onMouseUp={() => { setClicked(false); }} ref={fullscreenRef}>
      <Header toogleFullScreen={toogleFullScreen} isFullscreen={fullscreen} />
      <RequestHistory
        hide={requests.length <= 0}
        tabExecute={tabExecute}
        tabDelete={tabDelete}
        clearHistory={clearHistory}
      />
      <div className="api">
        <RequestArea
          error={requestError}
          title="Запрос"
          width={requestBoxWidth}
          moveSplitter={moveSplitter}
          onChange={onChange}
          text={requestText}
          savePosition={savePosition}
          name={'requestText'} />
        <div className="api__splitter" onMouseDown={StartCursorMoving} onMouseUp={savePosition} style={splitterClass}></div>
        <RequestArea
          error={responseError}
          title="Ответ"
          width={responseBoxWidth}
          moveSplitter={moveSplitter}
          text={responseText}
          savePosition={savePosition}
          name={'responseText'}
        />
      </div>
      <Footer formatRequestText={formatRequestText} onSubmit={sendRequest} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userStore.user,
    requests: state.historyStore.requests,
  };
};

const mapDispatchToProps = {
  setUser,
  deleteUser,
  addRequest,
  deleteRequest,
  setHistory
};

const enchancer = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default enchancer(APIConsole);

APIConsole.propTypes = {
  addRequest: PropTypes.func.isRequired,
  deleteRequest: PropTypes.func.isRequired,
  setHistory: PropTypes.func.isRequired,
  requests: PropTypes.arrayOf(PropTypes.object),
};
