import React from 'react';
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

class APIConsole extends React.PureComponent {
  constructor(props) {
    super(props);
    this.fullscreenRef = React.createRef();
  }

  state = {
    requestBoxWidth: 50,
    responseBoxWidth: 50,
    splitter: '',
    startCursorPosition: 0,
    clicked: false,
    requestText: '',
    responseText: '',
    requestError: false,
    responseError: false,
  };

  IsJsonString = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  componentDidMount() {
    if (cookie.load('splitter-position')) {
      const splitterPosition = cookie.load('splitter-position');
      this.setState({
        requestBoxWidth: splitterPosition.requestBoxWidth,
        responseBoxWidth: splitterPosition.responseBoxWidth
      });
    }
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      requestError: value.length > 0 ? !this.IsJsonString(value) : false,
    });
  }

  beautifyJson = (str) => {
    return JSON.stringify(JSON.parse(str), null, 2);
  }

  onSubmit = async request => {
    const { requestError, requestText } = this.state;
    this.setState({ responseError: false });
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
      this.props.addRequest({
        actionName: requestJson.action,
        requestJson: this.beautifyJson(requestBody),
        success: true,
      });
      this.setState({
        requestText: requestBody,
        responseText: this.beautifyJson(JSON.stringify(res))
      });
    }).catch((err) => {
      this.props.addRequest({
        actionName: requestJson.action,
        requestJson: this.beautifyJson(requestBody),
        success: false,
      });
      this.setState({
        requestText: requestBody,
        responseText: this.beautifyJson(JSON.stringify(err)),
        responseError: true
      });
    });
    return null;
  }

  moveSplitter = (e) => {
    const { startCursorPosition, requestBoxWidth, responseBoxWidth, clicked } = this.state;
    if (!clicked) {
      return false;
    }
    e.preventDefault();
    const newSplitterPosition = startCursorPosition - e.clientX;
    this.setState({
      requestBoxWidth: requestBoxWidth - newSplitterPosition / (window.innerWidth / 100),
      responseBoxWidth: responseBoxWidth + newSplitterPosition / (window.innerWidth / 100),
      startCursorPosition: e.clientX,
    });
    return true;
  }

  setStartCursorPosition = (e) => {
    this.setState({
      startCursorPosition: e.clientX,
      clicked: true,
      isFullscreen: false,
    });
  }

  onMouseUp = () => {
    this.setState({
      clicked: false,
    });
  }

  toogleFullScreen = () => {
    if (this.state.isFullscreen) {
      document.exitFullscreen();
    } else {
      this.fullscreenRef.current.requestFullscreen();
    }
  }

  formatRequestText = () => {
    this.setState({ requestText: this.beautifyJson(this.state.requestText) });
  }

  tabExecute = (request) => {
    this.onSubmit(request);
  }

  tabDelete = (actionName) => {
    const { deleteRequest } = this.props;
    deleteRequest(actionName);
  }

  clearHistory = () => {
    const { setHistory } = this.props;
    setHistory([]);
  }

  savePosition = () => {
    const { requestBoxWidth, responseBoxWidth } = this.state;
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

  render() {
    const { requests } = this.props;
    const {
      isFullscreen,
      clicked,
      requestError,
      requestBoxWidth,
      requestText,
      responseError,
      responseBoxWidth,
      responseText
    } = this.state;

    const splitterClass = {
      width: clicked ? '25px' : '15px',
    };

    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement) {
        this.setState({ isFullscreen: true });
      } else {
        this.setState({ isFullscreen: false });
      }
    });
    return (
      <div className="wrapper" onMouseUp={this.onMouseUp} ref={this.fullscreenRef}>
        <Header toogleFullScreen={this.toogleFullScreen} isFullscreen={isFullscreen} />
        <RequestHistory
          hide={requests.length <= 0}
          tabExecute={this.tabExecute}
          tabDelete={this.tabDelete}
          clearHistory={this.clearHistory}
        />
        <div className="api">
          <RequestArea
            error={requestError}
            title="Запрос"
            width={requestBoxWidth}
            moveSplitter={this.moveSplitter}
            onChange={this.onChange}
            text={requestText}
            savePosition={this.savePosition}
            name={'requestText'} />
          <div className="api__splitter" onMouseDown={this.setStartCursorPosition} onMouseUp={this.savePosition} style={splitterClass}></div>
          <RequestArea
            error={responseError}
            title="Ответ"
            width={responseBoxWidth}
            moveSplitter={this.moveSplitter}
            text={responseText}
            savePosition={this.savePosition}
            name={'responseText'}
          />
        </div>
        <Footer formatRequestText={this.formatRequestText} onSubmit={this.onSubmit} />
      </div>
    );
  }
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
  requests: PropTypes.object,
};
