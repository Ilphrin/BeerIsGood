import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import BeerList from './src/containers/Pages/List';
import BeerCreate from './src/containers/Pages/Create';
import BeerDetail from './src/containers/Pages/Detail';

const RootStack = createStackNavigator(
  {
    Home: BeerList,
    NewBeer: BeerCreate,
    BeerDetail,
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
      <RootStack />
    );
  }
}
