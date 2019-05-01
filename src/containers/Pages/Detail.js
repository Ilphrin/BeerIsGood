import React from 'react';
import PropTypes from 'prop-types';
import Stars from 'react-native-stars';
import sql from '../../models/sqlite';
import Card from '../../components/Card';
import Button from '../../components/Button';
import container from '../../StyleSheet/container';
import { Text, Image, View, TouchableOpacity, StyleSheet, ScrollView, Linking, TouchableWithoutFeedback } from 'react-native';
import BeerCarousel from '../BeerCarousel';
import { strings } from '../../utils/i18n.js';

const defaultAsset = require('../../../assets/icons/beer128.png');
const editIcon = require('../../../assets/icons/edit.png');
const twitterIcon = require('../../../assets/icons/twitter.png');

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
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

class BeerDetail extends React.Component {
  constructor({ navigation }) {
    super()
    const { params } = navigation.state;
    this.brewery = params.beer.brewery;
    this.beerName = params.beer.name;
    this.navigation = navigation;
    this.id = params.beer.id;
    this.type = params.beer.type;
    this.name = `${params.beer.name} - ${params.beer.brewery}`;
    this.color = params.beer.color;
    this.ibu = params.beer.ibu;
    this.alcohol = params.beer.alcohol;
    this.updateList = params.updateList;
    this.pics = [params.beer.pic, params.beer.picsecond, params.beer.picthird];
    this.source = this.pics[0] ? null : defaultAsset;
    this.stars = params.beer.stars;
    this.country = params.beer.country;
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

  handleTwitter = () => {
    Linking.openURL(`https://twitter.com/intent/tweet?text=I%20just%20tried%20the%20${this.beerName}%20beer%20from%20the%20${this.brewery}%20brewery!\n%40BeerIsGoodApp`);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {!this.source && (
            <BeerCarousel
              data={[this.pics[0], this.pics[1], this.pics[2]]}
              immutable
            />
          )}
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text>{strings('Beer.ibu')}: {this.ibu}</Text>
                <Text>{strings('Beer.alcohol')}: {this.alcohol}</Text>
                <Text>{strings('Beer.country')}: {this.country}</Text>
              </View>
              <View>
                <TouchableWithoutFeedback onPress={this.handleTwitter}>
                  <Image source={twitterIcon} style={[styles.icon, { marginRight: 10}]} />
                </TouchableWithoutFeedback>
              </View>
            </View>
            <Stars
              display={this.stars}
              spacing={12}
              count={5}
              starSize={18}
              emptyStar={require('../../../assets/icons/noStar.png')}
              backingColor={"#EAEADF"}
            />
          </Card>
          <Button
            onPress={() => {
              sql.rm_beer(sql.db, this.id, () => {
                this.updateList();
                this.navigation.goBack();
              });
            }}
            text={strings('Detail.removeBeer')}
            negative
          />
        </ScrollView>
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
  icon: {
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
