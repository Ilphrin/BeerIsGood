import React, { Component } from 'react';
import { StyleSheet, View, PermissionsAndroid, Dimensions } from 'react-native';
const { Permissions, FileSystem } = Expo;
import PropTypes from 'prop-types';
import BCamera from '../components/Camera.js';

export default class CameraContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermissions: this.requestCameraPermission(),
      pictureLoading: false,
    }
    this.camera = null;
    this.photoFolder = `${FileSystem.documentDirectory}photos/`;
  }

  async requestCameraPermission() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    return status === 'granted';
  }

  onCameraReady = () => {
  }

  takePhoto = async () => {
    if (this.camera) {
      this.setState({
        pictureLoading: true,
      });
      await this.camera.takePictureAsync({
        quality: 0.0,
      }).then(photo => {
        this.onPictureSaved(photo);
      }).catch(e => {
        console.error(e);
      })
    }
    else {
      console.error("This should not happen! There is no camera!");
    }
  }

  onPictureSaved = async photo => {
    const filename = `${this.photoFolder}${Date.now()}_beerisgood_.jpg`;
    await FileSystem.copyAsync({
      from: photo.uri,
      to: filename
    }).then(elem => {
      this.props.onPictureTaken(filename);
    }).catch(e => {
      console.error(e);
    });
  }

  render() {
    if (this.state.hasCameraPermissions) {
      return (
        <BCamera
          style={styles.camera}
          onCameraReady={this.onCameraReady}
          takePhoto={this.takePhoto}
          getRef={(ref) => { this.camera = ref; }}
          pictureLoading={this.state.pictureLoading}
        />
      )
    }
    else {
      return (
        <View />
      )
    }
  }
}

const styles = StyleSheet.create({
  camera: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})

CameraContainer.propTypes = {
  onPictureTaken: PropTypes.func.isRequired
};
