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

    this.state = {
      name: '',
      brewery: '',
      type: '',
      photo: '',
      hasCameraPermissions: null,
      isUsingCamera: false
    };
    this.updateList = this.props.navigation.getParam('updateList');
  }

  componentDidMount() {
    FileSystem.makeDirectoryAsync(this.photoFolder, { intermediates: true }).catch(e => {
      console.log('Directory already exists');
    });
  }

  static navigationOptions = {
    title: 'New Beer'
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

  onNewBeer = (event) => {
    const newBeer = this.state;
    sql.new_beer(sql.db, newBeer, (transaction, result) => {
      sql.get_all(sql.db, (transaction, all_result) => {
        this.updateList(all_result.rows._array);
        this.props.navigation.goBack();
      });
    });
  }

  onPictureTaken = (uri) => {
    this.setState({
      photo: uri,
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
    if (this.state.photo === '') {
      return (
        <Button
          onPress={this.isUsingCamera}
          style={styles.photoButton}
          text="Take a Photo!" />
      );
    }
    else {
      return (
        <Image
          style={styles.beerImage}
          source={{uri: this.state.photo}}/>
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
          onPress={this.onNewBeer}
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
  photoButton: {
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
