import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types';

const styleBox = color => StyleSheet.create({
  box: {
    backgroundColor: color,
    width: 80,
    height: 36,
  },
});

const ColorBox = ({
  color, name, onPress,
}) => {
  onPress.bind(name);
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
    >
      <View
        style={styleBox(color).box}
      />
    </TouchableWithoutFeedback>
  );
};

ColorBox.propTypes = {
  color: ExtraPropTypes.color.isRequired,
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

ColorBox.defaultProps = {
  onPress: () => {},
};

export default ColorBox;
