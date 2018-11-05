import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import BeerList from './src/components/Beer/List';
import BeerCreate from './src/components/Beer/Create';
import BeerDetail from './src/components/Beer/Detail';

const RootStack = createStackNavigator(
  {
    Home: BeerList,
    NewBeer: BeerCreate,
    BeerDetail,
  },
  {
    initialRouteName: 'Home',
  },
);

export default class App extends Component {
  render() {
    return (
      <RootStack />
    );
  }
}
