import React from 'react';
import './App.css';

import LoginScreen from './components/Login/LoginScreen';




class App extends React.PureComponent {
  state = {
  };

  componentDidMount() {

  }
  render() {

    return (
      <div className="App">
        <LoginScreen />
      </div>
    );
  }
}

export default App;
