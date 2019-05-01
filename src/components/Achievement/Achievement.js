import React from 'react';
import {
  Text,
  Image,
  Modal,
  View,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import { strings } from '../../utils/i18n';
import styles from './Achievement.layout';

const source = require('../../../assets/icons/Achievement.png');
const crossButton = require('../../../assets/icons/cross.png');

class Achievement extends React.PureComponent {
  render() {
    if (!this.props.visible) {
      return null;
    }
    return (
      <Modal
        animationType="slide"
        onRequestClose={this.props.onRequestClose}
        visible={this.props.visible}
        transparent
        style={styles.modal}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <TouchableOpacity onPress={this.props.onRequestClose} style={styles.cross}>
              <Image source={crossButton} resizeMode="contain" style={{ width: 32, height: 32 }} />
            </TouchableOpacity>
            <Text style={styles.congrats}>
              {strings('Achievement.congratulations')}
            </Text>
            <Image style={styles.imageBackground} resizeMode="contain" source={source} />
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
            >
              {strings('Achievement.youWon')}
            </Text>
            <Text style={{
              textAlign: 'center',
              fontSize: 18,
            }}
            >
              {this.props.achievement.name}
            </Text>
          </View>
        </View>
      </Modal>
    );
  }
}

Achievement.propTypes = {
  visible: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  achievement: PropTypes.object,
};

Achievement.defaultProps = {
  achievement: null,
};

export default Achievement;
