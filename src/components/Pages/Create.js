import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, PermissionsAndroid, Dimensions, Modal, Image } from 'react-native';
import PropTypes from 'prop-types';
import { FormLabel, FormInput } from 'react-native-elements';
const { Permissions, FileSystem } = Expo;
import BeerInput from '../../containers/BeerInput.js';
import CameraContainer from '../../containers/CameraContainer';
import sql from '../../models/sqlite';
import primaryButton from '../../StyleSheet/buttons';
import container from '../../StyleSheet/container';
import Button from '../Button';
import ColorBox from '../ColorBox';

export default class BeerCreate extends Component {
  constructor(props) {
    super(props);

    this.updateList = this.props.navigation.getParam('updateList');
    const beer = props.navigation.getParam('beer');

    if (beer !== undefined) {
      this.state = {
      hasCameraPermissions: null,
      isUsingCamera: false,
      ...beer,
      };
      this.isNewBeer = false;
    }
    else {
      this.state = {
        name: '',
        brewery: '',
        type: '',
        pic: '',
        color: 0,
        ibu: 0,
        hasCameraPermissions: null,
        isUsingCamera: false
      };
      this.isNewBeer = true;
    }
  }

  componentDidMount() {
    FileSystem.makeDirectoryAsync(this.picFolder, { intermediates: true }).catch(e => {
      console.log('Directory already exists');
    });
  }

  static navigationOptions = ({ navigation }) => {
    if (navigation.state.params.beer !== undefined) {
      return {
        title: 'Edit Beer',
      };
    }
    return {
      title: 'New Beer',
    };
  }

  onChangeValue = (value, name) => {
    let newState = {};
    newState[name] = value;
    this.setState(newState);
  }

  onChangeName = (name) => {
    this.setState({
      name,
    });
  }

  onChangeBrewery = (brewery) => {
    this.setState({
      brewery,
    });
  }

  onChangeType = (type) => {
    this.setState({
      type,
    });
  }

  onChangeColor = (color) => {
    this.setState({
      color,
    });
  }

  onChangeIBU = (ibu) => {
    this.setState({
      ibu,
    });
  }

  onPutBeer = (event) => {
    const newBeer = this.state;
    let sqlite_function = sql.new_beer;
    if (!this.isNewBeer) {
      sqlite_function = sql.update_beer;
    }
    // This is needed for regressions purpose (old variable name for photos)
    if (newBeer.pic === undefined) {
      newBeer.pic = newBeer.photo;
    }
    sqlite_function(sql.db, newBeer, (transaction, result) => {
      this.updateList();
      this.props.navigation.navigate('Home');
    });
  }

  onPictureTaken = (uri) => {
    this.setState({
      pic: uri,
      isUsingCamera: false
    })
  }

  renderCamera() {
    if (this.state.isUsingCamera) {
      return (
        <CameraContainer
          onPictureTaken={this.onPictureTaken} />
      );
    }
  }

  isUsingCamera = () => {
    this.setState({
      isUsingCamera: !this.state.isUsingCamera
    });
  }

  renderPhoto() {
    if (this.state.pic === '') {
      return (
        <Button
          onPress={this.isUsingCamera}
          style={styles.picButton}
          text="Take a Photo!" />
      );
    }
    else {
      return (
        <Image
          style={styles.beerImage}
          source={{uri: this.state.pic}}/>
      );
    }
  }

  render() {
    let camera = this.renderCamera();
    return (
      <View style={styles.container}>
        {camera}
        <ScrollView>
          <BeerInput
            value={this.state.name}
            onChangeText={this.onChangeValue}
            label="Name:"
            name="name"
          />

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <FormLabel>
                SRM:
              </FormLabel>
              <View style={{marginLeft: 20, marginTop: 5, marginBottom: 10}}>
                <ColorBox onPress={this.onChangeColor} />
              </View>
            </View>

            <View style={{maxWidth: '30%'}}>
              <BeerInput
                value={this.state.ibu}
                onChangeText={this.onChangeValue}
                label="IBU:"
                name="ibu"
              />
            </View>
          </View>

          <BeerInput
            value={this.state.brewery}
            onChangeText={this.onChangeValue}
            label="Brewery:"
            name="brewery"
          />

          <BeerInput
            value={this.state.type}
            onChangeText={this.onChangeValue}
            label="Type:"
            name="type"
          />

          {this.renderPhoto()}
        </ScrollView>
        <Button
          onPress={this.onPutBeer}
          text="Finish"/>
      </View>
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
  },
  multipleColumn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

BeerCreate.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  })
};
