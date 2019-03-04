import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Dimensions, Text, Animated, Easing, Modal} from 'react-native';
import PropTypes from 'prop-types';
import Stars from 'react-native-stars';
import sql from '../../models/sqlite';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Achievement from '../../components/Achievement';
import container from '../../StyleSheet/container';
import { getTip } from '../../utils/api';
import I18n, { strings } from '../../utils/i18n.js';

export default class BeerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beers: [],
      tip: null,
      fadeAnim: new Animated.Value(0.0),
      achievement: null,
    };
    this.updateList();
    getTip().then(this.updateTip);
  }

  static navigationOptions = {
    title: strings('List.pageTitle')
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1.0,
        duration: 1500,
        easing: Easing.back(),
      },
    ).start();
  }

  updateList = (achievement) => {
    sql.get_all(sql.db, (transaction, result) => {
      // We need to truncate Alcohol as there is some noise in the decimals
      const beers = result.rows._array;
      beers.forEach((elem) => {
        elem.alcohol = Math.round(elem.alcohol * 100) / 100;
      });
      this.setState({
        beers: result.rows._array
      });
    });
    if (achievement !== undefined) {
      this.setState({
        achievement,
      });
    }
  }

  updateTip = (data) => {
    this.setState({
      tip: data,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const params = nextProps.navigation.state.params;
    if (params && params.achievement !== null) {
      return {
        achievement: params.achievement,
      };
    }
    return null;
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
        <View
          key={elem.id}
          style={styles.cardStars}
        >
          <View
            style={styles.card}>
            <Card
              source={source}
              title={title}
              type={elem.type}
              color={elem.color}
              onPress={this.goToDetail.bind(this, elem)}
            />
          </View>
          <Stars
            display={elem.stars}
            spacing={12}
            count={5}
            starSize={12}
            emptyStar={require('../../../assets/icons/noStar.png')}
            backingColor={"#EAEADF"}
          />
        </View>
        );
      });
      // backingColor is set to the same as the background of the app,
      //as transparent is illegal

    return (
      <View style={styles.container}>
        {this.state.achievement !== null &&
          <View>
            <Achievement
              onRequestClose={() => {
                this.setState({
                  achievement: null,
                });
              }}
              title={this.state.achievement.name}
            />
          </View>
        }
        <ScrollView>
          <View style={{ height: 30 }}>
            {this.state.tip && 
              <Animated.Text style={[styles.tips, { opacity: this.state.fadeAnim }]}>{strings('List.tip')}: {this.state.tip[I18n.currentLocale()]}</Animated.Text>
            }
          </View>
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
          text={strings('List.addBeer')} />
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
    marginBottom: 5,
  },
  cardStars: {
    marginBottom: 12.
  },
  tips: {
    width: '100%',
    textAlign: 'center',
    fontSize: 11,
    opacity: 0.5,
  }
});

BeerList.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  })
}

