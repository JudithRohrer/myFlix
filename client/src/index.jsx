import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import MainView from './components/main-view/main-view';
import moviesApp from './reducers/reducers';

// import './index.scss';

const store = createStore(moviesApp);

// Main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}

// Finds the root to app
const container = document.getElementsByClassName('app-container')[0];

//Tells React to render app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
