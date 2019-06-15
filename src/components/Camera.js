import React from 'react';
import {
  Modal,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import Button from './Button';
import { strings } from '../utils/i18n';

const { Camera } = Expo; // eslint-disable-line no-undef

const quitIcon = require('../../assets/icons/remove.png');

const styles = StyleSheet.create({
  remove: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
  },
});

const BCamera = ({
  onRequestClose, style, onCameraReady, takePhoto, onQuit, getRef, pictureLoading,
}) => (
  <Modal
    animationType="fade"
    transparent={false}
    onRequestClose={onRequestClose}
  >
    <Camera
      style={style}
      type={Camera.Constants.Type.back}
      onCameraReady={onCameraReady}
      ratio="16:9"
      ref={getRef}
    />
    <TouchableWithoutFeedback onPress={onQuit}>
      <Image
        source={quitIcon}
        style={styles.remove}
        onPress={onQuit}
      />
    </TouchableWithoutFeedback>

    {pictureLoading ? (
      <ActivityIndicator
        size="large"
        color="#F9C546"
        style={{
          position: 'absolute',
          justifyContent: 'center',
          bottom: 10,
          left: 10,
          right: 10,
        }}
      />
    ) : (
      <Button
        onPress={takePhoto}
        text={strings('Create.takePhoto')}
        contentStyle={{
          position: 'absolute',
          flexDirection: 'row',
          alignContent: 'stretch',
          justifyContent: 'center',
          bottom: 10,
          left: 10,
          right: 10,
        }}
      />
    )}

  </Modal>
);

BCamera.propTypes = {
  onRequestClose: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  onCameraReady: PropTypes.func,
  takePhoto: PropTypes.func.isRequired,
  getRef: PropTypes.func.isRequired,
  pictureLoading: PropTypes.bool.isRequired,
  onQuit: PropTypes.func.isRequired,
};

BCamera.defaultProps = {
  onRequestClose: () => {},
  onCameraReady: () => {},
  style: {},
};

export default BCamera;
