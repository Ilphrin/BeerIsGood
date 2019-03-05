import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ImageBackground,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { strings } from '../../utils/i18n.js';

const source = require('../../assets/icons/Achievement.png');

const styles = StyleSheet.create({
  image: {
  },
});

class Achievement extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      onRequestClose: props.onRequestClose,
      zoomIndex: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(
      this.state.zoomIndex,
      {
        toValue: 1,
        easing: Easing.elastic(),
        duration: 1000,
      },
    ).start();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.state.onRequestClose}>
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, .8)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            zIndex: 10,
          }}
        >
          <Animated.View
            style={{
              width: '96%',
              paddingTop: '4%',
              position: 'relative',
              top: '20%',
              transform: [
                { scale: this.state.zoomIndex },
              ],
            }}
          >
            <ImageBackground
              style={{
                width: '100%',
                height: 200,
              }}
              source={source}
            >
              <Text
                style={{
                  position: 'relative',
                  top: '4%',
                  left: 0,
                  textAlign: 'center',
                  fontSize: 20,
                  color: 'white',
                }}
              >
                {strings('Achievement.congratulations')}:
              </Text>
            </ImageBackground>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              }}
            >
              {strings('Achievement.youWon')}:
            </Text>
            <Text style={{
              textAlign: 'center',
              fontSize: 18,
              }}
            >
              {this.state.title}
            </Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Achievement.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Achievement;
