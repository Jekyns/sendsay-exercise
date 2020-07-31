import { createStore, applyMiddleware  } from 'redux';
import reducer from './reducers';
import { devToolsEnhancer  } from 'redux-devtools-extension';

export default createStore(
  reducer,
  devToolsEnhancer()
);
