import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import BeerList from './src/containers/Pages/List';
import BeerCreate from './src/containers/Pages/Create';
import BeerDetail from './src/containers/Pages/Detail';
import Connection from './src/containers/Pages/Connection';
import store from './store';

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

const App = () => (
  <Provider store={store}>
    <RootStack />
  </Provider>
);

export default App;
