import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import sql from '../../models/sqlite';
import Card from '../Card';
import Button from '../Button';
import container from '../../StyleSheet/container';

const defaultAsset = require('../../../assets/icons/beer128.png');
const editIcon = require('../../../assets/icons/edit.png');

const styles = StyleSheet.create({
  container,
});

class BeerDetail extends React.Component {
  constructor({ navigation }) {
    super();
    const { params } = navigation.state;
    this.navigation = navigation;
    this.id = params.beer.id;
    this.type = params.beer.type;
    this.name = `${params.beer.name} - ${params.beer.brewery}`;
    this.source = params.beer.pic !== '' ? { uri: params.beer.pic } : defaultAsset;
    this.updateList = params.updateList;
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.state.params.beer.name}`,
    };
  };

  render() {
    return (
      <Card
        source={this.source}
        title={this.name}
        type={this.type}
        style={styles.container}
        titleStyle={{
          fontSize: 20,
          color: '#222',
          fontWeight: 'bold',
        }}
      >
        <Button
          onPress={() => {
            sql.rm_beer(sql.db, this.id, () => {
              this.updateList();
              this.navigation.goBack();
            });
          }}
          text="Remove this beer"
          negative
        />
      </Card>
    );
  }
}

BeerDetail.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default BeerDetail;
