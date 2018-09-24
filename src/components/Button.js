import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { primaryButton, negativeButton } from '../StyleSheet/buttons';

const Button = ({
  onPress, style, negative, text,
}) => {
  const button = negative ? negativeButton : primaryButton;
  const allStyle = StyleSheet.flatten([button, style]);
  return (
    <TouchableOpacity
      style={allStyle}
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
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
  text: PropTypes.string.isRequired,
  negative: PropTypes.bool,
};

Button.defaultProps = {
  style: StyleSheet.create({}),
  negative: false,
};

export default Button;
