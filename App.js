import React, {Component} from 'react';
import {Navigation} from './route/navigation';
import {NavigationContainer} from '@react-navigation/native';
import Register from './pages/register';

class App extends Component {
  render() {
    return (
      <Navigation/>
      // <Register/>
    )
  }
}

export default App;
