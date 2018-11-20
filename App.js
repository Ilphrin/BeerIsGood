import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import BeerList from './src/components/Pages/List';
import BeerCreate from './src/components/Pages/Create';
import BeerDetail from './src/components/Pages/Detail';

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
