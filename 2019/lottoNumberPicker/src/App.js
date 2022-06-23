import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from 'firebase';
import ScrollToTop from './components/ScrollToTop';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';
import reducers from './reducers';

/* Screens */

import Home from './screens/home/Home';


class App extends Component {
  constructor(props) {
    super(props);
    var config = {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {});

    return (
      <Provider store={store}>
        <Router onUpdate={() => window.scrollTo(0, 0)}>
          <div>
            <ScrollToTop />
            <Route path="/" component={Home} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
