import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import sql from '../../models/sqlite';
import Card from '../Card';
import Button from '../Button';
import container from '../../StyleSheet/container';

const defaultAsset = require('../../../assets/icons/beer128.png');

const styles = StyleSheet.create({
  container,
});

function BeerDetail({ navigation }) {
  const { params } = navigation.state;
  const { id, type } = params.beer;
  const name = `${params.beer.name} - ${params.beer.brewery}`;
  const { updateList } = params;
  const source = params.beer.pic !== '' ? { uri: params.beer.pic } : defaultAsset;
  return (
    <Card
      source={source}
      title={name}
      type={type}
      style={styles.container}
      titleStyle={{
        fontSize: 20,
        color: '#222',
        fontWeight: 'bold',
      }}
    >
      <Button
        onPress={() => {
          sql.rm_beer(sql.db, id, () => {
            updateList();
            navigation.goBack();
          });
        }}
        text="Remove this beer"
        negative
      />
    </Card>
  );
}

BeerDetail.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default BeerDetail;
