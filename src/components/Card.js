import React from 'react';
import {
  StyleSheet, Text, Image, View, TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import ColorBox from './ColorBox';
import BeerCarousel from '../containers/BeerCarousel';
import mapPicCarousel from '../utils/mapPicCarousel';

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

const hasMultiplePictures = (source, pics) => {
  if (pics.length > 1) {
    return (
      <BeerCarousel
        data={mapPicCarousel(pics[0], pics[1], pics[2])}
      />
    );
  }
  return (
    <Image
      resizeMode="contain"
      source={source}
      style={styles.image}
    />
  );
};

const Card = ({
  onPress, source, titleStyle, title, type, children, color, pics,
}) => (
  <TouchableWithoutFeedback
    onPress={onPress}
  >
    <View style={styles.container}>
      {hasMultiplePictures(source, pics)}
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
  pics: PropTypes.array,
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
  pics: [],
};

export default Card;
