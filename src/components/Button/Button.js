import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import kinds from '../../StyleSheet/buttons';

const Button = ({
  onPress, style, text, contentStyle,
}) => (
  <TouchableOpacity
    style={[kinds[style], kinds.button, contentStyle]}
    onPress={onPress}
  >
    <Text style={{
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 18,
    }}
    >
      {text}
    </Text>
  </TouchableOpacity>
);

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  style: PropTypes.string,
  contentStyle: PropTypes.object,
};

Button.defaultProps = {
  style: 'primary',
  contentStyle: {},
};

export default Button;
