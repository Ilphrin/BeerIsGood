import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, PermissionsAndroid, Dimensions, Modal, Image } from 'react-native';
import PropTypes from 'prop-types';
import { FormLabel, FormInput } from 'react-native-elements';
const { Permissions, FileSystem } = Expo;
import CameraContainer from '../../containers/CameraContainer';
import sql from '../../models/sqlite';
import primaryButton from '../../StyleSheet/buttons';
import container from '../../StyleSheet/container';
import Button from '../Button';

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

  onChangeName = (name) => {
    this.setState({
      name
    });
  }

  onChangeBrewery = (brewery) => {
    this.setState({
      brewery
    });
  }

  onChangeType = (type) => {
    this.setState({
      type
    });
  }

  onPutBeer = (event) => {
    const newBeer = this.state;
    let sqlite_function = sql.new_beer;
    if (!this.isNewBeer) {
      sqlite_function = sql.update_beer;
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
          <FormLabel>
            Name:
          </FormLabel>
          <FormInput
            value={this.state.name}
            onChangeText={this.onChangeName}
          />

          <FormLabel>
            Brewery
          </FormLabel>
          <FormInput
            value={this.state.brewery}
            onChangeText={this.onChangeBrewery}
          />

          <FormLabel>
            Type
          </FormLabel>
          <FormInput
            value={this.state.type}
            onChangeText={this.onChangeType}
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
  }
});

BeerCreate.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  })
};
