import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
const { FileSystem } = Expo;

import AutoComplete from '../AutoComplete';
import sql from '../../models/sqlite';
import primaryButton from '../../StyleSheet/buttons';
import container from '../../StyleSheet/container';
import { strings } from '../../utils/i18n.js';
import Form from '../Form';

export default class BeerCreate extends Component {
  constructor(props) {
    super(props);

    this.updateList = this.props.navigation.getParam('updateList');
    this.beer = props.navigation.getParam('beer');
    this.isNewBeer = [null, undefined].includes(this.beer);

    this.state = {
      modify: true,
      nameFocus: false,
      editing: false,
      data: [],
      namePosition: [],
    };

    this.fields = [
      {
        label: "Beer Name",
        name: "name",
        type: "Text",
      },
      {
        label: "IBU",
        name: "ibu",
        type: "Number",
      },
      {
        label: 'Alcohol',
        initialValue: '0.0',
        name: 'alcohol',
        type: 'Number',
      },
      {
        name: 'color',
        type: 'Color',
        initialValue: 0,
      },
      {
        label: 'Brewery',
        name: 'brewery',
        type: 'Text',
      },
      {
        label: 'Type',
        name: 'type',
        type: 'Text',
      },
      {
        label: 'Country',
        name: 'country',
        type: 'Text',
      },
      {
        name: 'photos',
        type: 'PhotoCarousel',
      },
      {
        name: 'stars',
        type: 'Star',
        initialValue: 1,
      },
    ]

    if (this.beer) {
      const beer = this.beer;
      this.fields.forEach((value, index, array) => {
        const val = value.name !== 'photos' ? beer[value.name] : [
          beer.pic, beer.picsecond, beer.picthird,
        ];
        array[index] = {
          ...value,
          initialValue: val,
        };
      });
    }
  }

  componentDidMount() {
    FileSystem.makeDirectoryAsync(this.picFolder, { intermediates: true });
  }

  static navigationOptions = ({ navigation }) => {
    if (navigation.state.params.beer !== undefined) {
      return {
        title: strings('Create.editBeer'),
      };
    }
    return {
      title: strings('Create.createBeer'),
    };
  }

  onPutBeer = (fields) => {
    const newBeer = {
      ...fields,
      pic: fields.photos[0],
      picsecond: fields.photos[1],
      picthird: fields.photos[2],
    };
    let sqlite_function = sql.new_beer;
    if (!this.isNewBeer) {
      sqlite_function = sql.update_beer;
      newBeer.id = this.beer.id;
    }
    // This is needed for regressions purpose (old variable name for photos)
    if (newBeer.pic === undefined) {
      newBeer.pic = newBeer.photo;
    }
    sqlite_function(sql.db, newBeer, (transaction, result, achievement) => {
      if (achievement !== null) {
        this.updateList(achievement);
      }
      else {
        this.updateList();
      }
      this.props.navigation.navigate('Home');
    }, err => { console.log(err)});
  }

  onSelection = elem => {
    this.setState({
      name: elem.name,
      ibu: elem.ibu,
      alcohol: elem.alcohol,
      data: [],
      modify: false,
    });
  }

  render() {
    const elem = this.state.data.length > 0 && !this.state.editing && (
      <AutoComplete
        data={this.state.data}
        position={this.state.namePosition}
        onSelection={this.onSelection}
        style={styles.autocomplete}
      />
    );
    return (
      <Form fields={this.fields} onSubmit={this.onPutBeer} />
    )
  }
}

const styles = StyleSheet.create({
  container,
  beerImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginVertical: 10,
  },
  finishButton: primaryButton,
  camera: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  picButton: {
    marginBottom: 20,
    marginTop: 20,
    marginRight: 15,
    marginLeft: 15,
  },
  multipleColumn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  autocomplete: {
    marginLeft: 20,
    marginRight: 20,
  }
});

BeerCreate.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  })
};
