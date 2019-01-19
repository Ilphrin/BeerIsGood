import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import sql from '../../models/sqlite';
import Card from '../Card';
import Button from '../Button';
import container from '../../StyleSheet/container';
import { Text, Image, View, TouchableOpacity } from 'react-native';

const defaultAsset = require('../../../assets/icons/beer128.png');
const editIcon = require('../../../assets/icons/edit.png');

const DetailTitle = (props) => {
  return (
    <View style={styles.headerTitle}>
      <Text>
        {props.name}
      </Text>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('NewBeer', {
            beer: props.beer,
            updateList: props.updateList,
          });
        }}
      >
        <Image
          source={editIcon}
          style={styles.editIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

class BeerDetail extends React.Component {
  constructor({ navigation }) {
    super();

    const { params } = navigation.state;
    this.navigation = navigation;
    this.id = params.beer.id;
    this.type = params.beer.type;
    this.name = `${params.beer.name} - ${params.beer.brewery}`;
    this.color = params.beer.color;
    this.source = params.beer.pic !== '' ? { uri: params.beer.pic } : defaultAsset;
    this.ibu = params.beer.ibu;
    this.updateList = params.updateList;
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <DetailTitle
        name={navigation.state.params.beer.name}
        navigation={navigation}
        beer={navigation.state.params.beer}
        updateList={navigation.state.params.updateList}
      />,
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Card
          source={this.source}
          title={this.name}
          type={this.type}
          color={this.color}
          titleStyle={{
            fontSize: 20,
            color: '#222',
            fontWeight: 'bold',
          }}
        >
          <Text>IBU: {this.ibu}</Text>
        </Card>
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
      </View>
    );
  }
}

BeerDetail.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container,
  editIcon: {
    width: 32,
    height: 32,
  },
  headerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginRight: 15
  }
});

export default BeerDetail;
