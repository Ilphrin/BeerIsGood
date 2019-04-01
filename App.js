import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import BeerList from './src/containers/Pages/List';
import BeerCreate from './src/containers/Pages/Create';
import BeerDetail from './src/containers/Pages/Detail';
import Connection from './src/containers/Pages/Connection';
import store from './store';

console.disableYellowBox = true;

const RootStack = createStackNavigator(
  {
    Home: BeerList,
    NewBeer: BeerCreate,
    BeerDetail,
    Connection,
  },
  {
    initialRouteName: 'Home',
    cardStyle: {
      backgroundColor: '#EAEADF',
    },
  },
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}
