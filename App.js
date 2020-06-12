import React from 'react';
import StackNavigator from './src/screens/StackNavigator';
import {Provider} from 'react-redux';
import store from './src/redux/store';
console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    );
  }
}
