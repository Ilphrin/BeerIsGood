import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import sql from '../../models/sqlite';
import Button from '../Button';
import Card from '../Card';
import container from '../../StyleSheet/container';

export default class BeerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beers: []
    };
    this.updateList();
  }

  static navigationOptions = {
    title: 'Beers'
  }

  updateList = () => {
    sql.get_all(sql.db, (transaction, result) => {
      this.setState({
        beers: result.rows._array
      });
    })
  }

  goToDetail = (elem) => {
    this.props.navigation.navigate('BeerDetail', {
      beer: elem,
      updateList: this.updateList,
    });
  }

  render() {
    const beers = this.state.beers.map((elem, index) => {
      const title=`${elem.name} - ${elem.brewery}`
      const source = elem.pic !== '' && elem.pic ? { uri: elem.pic } : require('../../../assets/icons/beer.png');
      return (
        <View key={elem.id}
          style={styles.card}>
          <Card
            source={source}
            title={title}
            type={elem.type}
            color={elem.color}
            onPress={this.goToDetail.bind(this, elem)}
          />
        </View>
        );
    });

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.list}>
            {beers}
          </View>
        </ScrollView>
        <Button
          onPress={() => {
            this.props.navigation.navigate('NewBeer', {
              updateList: this.updateList
            })
          }}
          text="Add a Beer" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    paddingTop: 20,
  },
  container,
  card: {
    width: Dimensions.get('window').width / 2 - 40,
    height: 130,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'center',
    borderRadius: 3,
    elevation: 3,
    backgroundColor: '#FFF',
    marginBottom: 15
  },
});

BeerList.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  })
}

