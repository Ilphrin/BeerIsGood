import React from 'react';
import {
  StyleSheet, Text, Image, View, TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types';
import ColorBox from './ColorBox';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 0,
    left: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  content: {
    flex: 1,
  },
  type: {
    fontSize: 10,
    color: '#666',
    height: 15,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    minHeight: 55,
  },
  colorBox: {
    marginTop: 4,
  },
});

const Card = ({
  onPress, source, titleStyle, title, type, children, color,
}) => (
  <TouchableWithoutFeedback
    onPress={onPress}
  >
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={source}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={titleStyle}>{title}</Text>
        <Text style={styles.type}>{type}</Text>
        <View style={styles.colorBox}>
          {color !== null
          && (
            <ColorBox
              index={color}
              immutable
            />)
          }
        </View>
        {children}
      </View>
    </View>
  </TouchableWithoutFeedback>
);

Card.propTypes = {
  titleStyle: PropTypes.object,
  onPress: PropTypes.func,
  source: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]),
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  color: PropTypes.number,
};

Card.defaultProps = {
  titleStyle: {
    fontSize: 12,
    color: '#222',
    height: 15,
  },
  onPress: () => {},
  source: {},
  children: undefined,
  color: null,
};

export default Card;
