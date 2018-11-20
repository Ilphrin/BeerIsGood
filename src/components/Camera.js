import React from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import Button from './Button';

const { Camera } = Expo; // eslint-disable-line no-undef

const BCamera = ({
  onRequestClose, style, onCameraReady, takePhoto, getRef, pictureLoading,
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
        text="Take!"
        style={{
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
  onCameraReady: PropTypes.func.isRequired,
  takePhoto: PropTypes.func.isRequired,
  getRef: PropTypes.func.isRequired,
};

BCamera.defaultProps = {
  onRequestClose: () => {},
  style: {},
};

export default BCamera;